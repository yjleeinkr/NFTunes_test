// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "./MintMusicToken.sol";


contract Auction{
    //수익자
    address public TokenOwner;
    //경매시작시간
    uint public auctionStart;
    //경매끝시간
    uint public auctionEnd;
    //토큰id
    uint public tokenId;
    //최소입찰가
    uint public minimumBid;
    
    //최고입찰자
    address public highestBidder;
    //최고입찰금액
    uint public highestBid;

    uint public date;

    MintMusicToken public mintMusicTokenAddress;//변수에 넣어줌

    //입찰자리스트
    //(미낙찰자 데이터 저장)
    //입찰자계정  => 입찰가
    mapping(address => uint) refundOfBid;


    //경매등록담을배열
    uint[] public AuctionList;

    //event
    event AuctionInfo (address indexed owner, uint256 indexed tokenId, uint256 auctionStart, uint256 minimumBid);//경매시작정보
    event AuctionCancle (address indexed owner, uint256 indexed tokenid);//경매취소 정보
    event AuctionEnded (address indexed winner, uint256 winningBid, uint256 auctionEnd, uint256 indexed tokenId);//경매종료정보

    //경매등록
    //주인, tokenId, 시작시간, 마감시간, 최소입찰가
    constructor(address _mintMusicTokenAddress){
       mintMusicTokenAddress = MintMusicToken(_mintMusicTokenAddress);

    }

    //Auction정보등록하는함수

    //**경매시간은 년 월 일 시간까지 설정가능하다 */
    function SimpleAuction(uint256 _tokenId, uint256 _auctionStart, uint256 _auctionEnd, uint256 _minimumBid) public {
        TokenOwner = mintMusicTokenAddress.ownerOf(_tokenId);//tokenId로 나오는 계정을 TokenOwner변수에 담아주었다
        // date = getData(uint block.timestamp)+getMonth(uint block.timestamp)+getFullYear(uint block.timestamp)+getHours(uint block.timestamp)+getMinutes(uint block.timestamp)+getseconds(uint block.timestamp)); 

        require(_minimumBid > 0 , "Minimum bid must be at least 0");//최소입찰가는  0초과이여야됨
        require(_auctionStart > block.timestamp , "Please set the auction start time after the current time");//옥션시작시간은 현재시간이후여야된다
        require(_auctionEnd > _auctionStart , "The auction closing time must be after the start time");//경매마감시간은 시작시간이후여야된다
        require(TokenOwner == msg.sender ,"Register your own token");//토큰주인이 경매등록을하는가
        
        tokenId = _tokenId;
        auctionStart = _auctionStart;
        auctionEnd = _auctionEnd;
        minimumBid = _minimumBid;

        AuctionList.push(_tokenId);//경매리스트를 배열에 담음

        emit AuctionInfo (TokenOwner, tokenId, auctionStart, minimumBid);

    }
 

    // 가격제시함수 + 입찰
    function BidOffer(uint _tokenId ) public payable {
        TokenOwner = mintMusicTokenAddress.ownerOf(_tokenId);
        
        require(TokenOwner != msg.sender ,"Token owner cannot be a bidder");//토큰주인이 입찰자가 될수 없다
        require(block.timestamp <= auctionEnd ,"auction is over");//경매시간이 지나지 않았어야됨
        require(msg.value > minimumBid , "The price I offer must be higher than the lowest bid");//제시한가격이 최저입찰가보다 높아야한다
        require(msg.value > highestBid , "Please provide the highest bid");//내가제시한가격이 최고입찰가보다 높아야된다 
        require(msg.sender.balance > msg.value , "Token balance is less than the amount presented");// 내가제시한 금액보다 더 많은 돈을 가지고 있어야 된다  

    
        if (highestBid != 0) {
            refundOfBid[highestBidder] += highestBid; 
        }//최고입찰금액이 0이 아니라면  즉  입찰자가 있다면, 그사람의 데이터를 맵핑에 저장 나중에 돈을 돌려줘야됨

        highestBidder = msg.sender;
        highestBid = msg.value;

        payable(TokenOwner).transfer(highestBid);

        
        //연장함수
        if(auctionEnd -1 minutes >= block.timestamp){//경매마감1분전시간은 현재시간보다 커야됨  즉 경매마감되기 1분전까지만 입찰자가 있을시 연장해줌(즉 59초부터는 안됨)
            if(block.timestamp >= auctionEnd -5 minutes){//현재시간은  경매마감 5분전부터 가능
                TimeExtension(_tokenId);
            }
        }
     
        //경매종료함수
        require(auctionEnd == block.timestamp);
        AuctionEnd(_tokenId);

    }

    //옥션취소함수 (시간은 안끝났지만 마음이변해서 취소하고싶을때, 입찰자는 없어야됨, 대신 경매종료시간이 지나기전에만 가능)
    function AuctionCancel(uint _tokenId) public {
        TokenOwner = mintMusicTokenAddress.ownerOf(_tokenId);

        require(block.timestamp < auctionEnd ,"auction is over");//경매시간이 지나지 않았어야됨
        require(msg.sender == TokenOwner, "Only the token owner can cancel");//취소하는자는  토큰주인이여야된다 
        require(highestBid > 0, "there is a bidder");//입찰자가 있으면 안된다

        // 애초부터 경매등록이 된 토큰이어야한다
        // 팔린걸 배열에서 지워주는거
        for(uint256 i = 0; i < AuctionList.length; i++) {
            if(AuctionList[i] == _tokenId ) {
                AuctionList[i] = AuctionList[AuctionList.length - 1];
                AuctionList.pop();//맨마지막요소를 날려주는 아이
            
            }
        } 
    }


    //입찰자들이 많아서 정해진 종료시간보다 연장하는 함수
    function TimeExtension(uint _tokenId) public{
        TokenOwner = mintMusicTokenAddress.ownerOf(_tokenId);

        require(block.timestamp < auctionEnd, "auction is over");//경매시간이 지나지 않았어야됨
        require(msg.sender == TokenOwner, "Only the token owner can cancel");//연장하고자하는자는 토큰주인이어야 된다 

        if(auctionEnd -1 minutes >= block.timestamp){//경매마감1분전시간은 현재시간보다 커야됨  즉 경매마감되기 1분전까지만 입찰자가 있을시 연장해줌(즉 59초부터는 안됨)
            if(block.timestamp >= auctionEnd -5 minutes){//현재시간은  경매마감 5분전부터 가능
                auctionEnd += 10 minutes;
            }//즉 경매끝나기 5분전부터 1분전까지 입찰자가 나오면 마감시간이 자동으로 10분연장
        }
    }

    //미낙찰자들 수동으로 돈돌려받는 함수
    //미낙찰자들이 함수실행
    function BidReturn() public payable returns (bool){
        uint amount = refundOfBid[msg.sender];

        if(amount > 0){//입찰가가 0이상이면(돈을돌려줘야되니까)
            payable(msg.sender).transfer(amount);//돈돌려주고
            refundOfBid[msg.sender] = 0;//amount를 0으로 바꿈
        }
        return true;
    }


    // 경매종료 +  낙찰자돈을  주인한테 송금하는함수
    // (payable(tokenOnwer).transfer(msg.value);
    function AuctionEnd(uint _tokenId) public {
        TokenOwner = mintMusicTokenAddress.ownerOf(_tokenId);

        require(auctionEnd < block.timestamp , "Auction isn't over yet");//경매가 끝나야됨

        // // 판매자한테 낙찰금액을 이전
        // payable(TokenOwner).transfer(highestBid);

        mintMusicTokenAddress.transferFrom(TokenOwner, highestBidder, _tokenId);//권한이전

        // 팔린걸 배열에서 지워주는거
        for(uint256 i = 0; i < AuctionList.length; i++) {
            if(AuctionList[i] == _tokenId ) {
                AuctionList[i] = AuctionList[AuctionList.length - 1];
                AuctionList.pop();//맨마지막요소를 날려주는 아이
            }
        } 

        BidReturn();
        emit AuctionEnded (highestBidder, highestBid, auctionEnd, _tokenId);
    }    
}


