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

    MintMusicToken public mintMusicTokenAddress;//변수에 넣어줌

    //입찰반환맵핑
    //(미낙찰자 데이터 저장)
    //입찰자계정  => 입찰가
    mapping(address => uint) refundOfBid;


    //경매등록담을배열
    uint[] public AuctionList;

    //event
    event AuctionInfo (address indexed owner, uint256 indexed tokenId, uint256 auctionStart, uint256 minimumBid);//경매시작정보
    event AuctionCancle (address indexed owner, uint256 indexed tokenid);//경매취소 정보
    event AuctionEnded (address indexed winner, uint256 winningBid, uint256 auctionEnd);//경매종료정보

    //경매등록
    //주인, tokenId, 시작시간, 마감시간, 최소입찰가
    constructor(address _mintMusicTokenAddress){
       mintMusicTokenAddress = MintMusicToken(_mintMusicTokenAddress);

    }

    //Auction정보등록하는함수
    function SimpleAuction(uint256 _tokenId, uint256 _auctionStart, uint256 _auctionEnd, uint256 _minimumBid) public {
        address TokenOwner = mintMusicTokenAddress.ownerOf(_tokenId);//tokenId로 나오는 계정을 TokenOwner변수에 담아주었다

        require(_minimumBid > 0 , "Minimum bid must be at least 0");//최소입찰가는  0이상이여야됨
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
    function BidOffer(uint _tokenId) public payable {
        address TokenOwner = mintMusicTokenAddress.ownerOf(_tokenId);
        
        require(TokenOwner != msg.sender ,"Token owner cannot be a bidder");//토큰주인이 입찰자가 될수 없다
        require(block.timestamp <= auctionEnd ,"auction is over");//경매시간이 지나지 않았어야됨
        require(msg.value > minimumBid , "The price I offer must be higher than the lowest bid");//제시한가격이 최저입찰가보다 높아야한다
        require(msg.value > highestBid , "Please provide the highest bid");//내가제시한가격이 최고입찰가보다 높아야된다 
    

        if (highestBid !=0) {
            refundOfBid[highestBidder] += highestBid; 

        }//최고입찰금액이 0이 아니다 즉 전 입찰자가 있었다면 그사람의 데이터를 맵핑에 저장해두고 나중에 돌려주려고

        highestBidder = msg.sender;
        highestBid = msg.value;

        require(auctionEnd < block.timestamp , "Auction isn't over yet");//경매가 끝나야됨  그래야 소유권 이전할수있음
        mintMusicTokenAddress.transferFrom(TokenOwner, msg.sender, _tokenId);//권한이전

        // 팔린걸 배열에서 지워주는거
        for(uint256 i = 0; i < AuctionList.length; i++) {
            if(AuctionList[i] == _tokenId ) {
                AuctionList[i] = AuctionList[AuctionList.length - 1];
                AuctionList.pop();//맨마지막요소를 날려주는 아이
            
            }
        }   
    }

    //옥션취소함수 (시간은 안끝났지만 마음이변해서 취소하고싶을때, 입찰자가 있어도되고 없어도됨, 대신 경매종료시간이 지나기전에만 가능)
    function AuctionCancel() public {
        require(block.timestamp <= auctionEnd ,"auction is over");//경매시간이 지나지 않았어야됨

    }//경매낙찰자가 지정되지않음 경매가시작되기전이라면 개시되지않는다 
    //만일 입찰자가있었다면 돈을돌려준다 없으면 그냥 끝낸가 


    //입찰자들이 많아서 정해진 종료시간보다 연장하는 함수


    //미낙찰자들 수동으로 돈돌려받는 함수
    //미낙찰자들이 함수실행
    function BidReturn() public payable returns (bool){
        uint amount = refundOfBid[msg.sender];

        if(amount >0){//입찰가가 0이상이면(돈을돌려줘야되니까)
            payable(msg.sender).transfer(amount);//돈돌려주고
            refundOfBid[msg.sender] = 0;//amount를 0으로 바꿈
        }
        return true;
    }

    // 경매종료 +  낙찰자돈을  주인한테 송금하는함수
    // (payable(tokenOnwer).transfer(msg.value);
    function AuctionEnd() public payable{
        require(auctionEnd < block.timestamp , "Auction isn't over yet");//경매가 끝나야됨

        // 판매자한테 낙찰금액을 이전
        payable(TokenOwner).transfer(highestBid);

        emit AuctionEnded (highestBidder, highestBid, auctionEnd);
    }

    

    //timestamp
}

