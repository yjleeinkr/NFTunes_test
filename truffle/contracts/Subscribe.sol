// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

contract Subscribe_yj{
    uint256 public sub_price = 1 ether;
    // uint256 public sub_price3 = 2.5 ether;
    // uint256 public sub_price6 = 5 ether;

    mapping(address => uint) public subscribeTime;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Subscribed(address indexed user, uint startTime, bool state);

    function setSubscribe(address _user, uint _time) internal {
        subscribeTime[_user] = _time;
    }

//구독
    function subscribe() public payable{
        require(msg.value >= sub_price, "lack of balance, need to charge");
        // require(subscribeState[msg.sender] != false , "already subscribed");
        payable(address(this)).transfer(msg.value);
        setSubscribe(msg.sender, block.timestamp);
        emit Subscribed(msg.sender, block.timestamp, true);
    }

//재구독.
    function reSubscribe() public payable {
        require(block.timestamp > subscribeTime[msg.sender]+30 days, "You already subscribed." );
        require(msg.value >= sub_price, "lack of balance, need to charge");
        payable(address(this)).transfer(msg.value);
        setSubscribe(msg.sender, block.timestamp);
        emit Subscribed(msg.sender, block.timestamp, true);
    }

<<<<<<< HEAD
    function subscribe(address payable _to) public payable{
        marketOwner = _to;
        approver = address(this);

        setUserState(msg.sender,true);
      

        require(msg.value < sub_price, "Please charge your wallet");
        require(isApprovedForAll(msg.sender,approver));
        
        payable(_to).transfer(msg.value);

        

        transferFrom(approver,marketOwner,sub_price);

        firstPayment = block.timestamp;    
        nextPayment = firstPayment + 1 minutes;
    }

    function firstTimestamp(address _owner) public view returns(uint){
        require(subscribeState[_owner] != false, "Subscribe Our Service");
        return firstPayment;
    }

    function nextTimestamp(address _owner) public view returns(uint){
        require(subscribeState[_owner] != false, "Subscribe Our Service");
        return nextPayment;
    }



    // //
    // function nextSubscribe(address payable _owner) public payable{

    //     require(block.timestamp == nextPayment);
    //     require(_owner == msg.sender);

    //     _owner.transfer(msg.value);
    // }


 
    function cancelSubscribe(address payable _owner) public{
        if(block.timestamp < nextPayment){
            setUserState(_owner, false);
        } else {
            withdrawSubscribe(_owner);
        }
    }

      
    function withdrawSubscribe(address payable _owner) public payable{
        uint refund =  sub_price;
        require(block.timestamp <= nextPayment+1 minutes);
        
        payable(msg.sender).transfer(refund);

        setUserState(_owner, false);

    }

    function isApprovedForAll(address owner, address operator) public view virtual returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    function _isApprovedOrOwner(address spender) internal view virtual returns (bool) {
        address owner = msg.sender;
        return (spender == owner || isApprovedForAll(owner, spender));
    }

    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        require(owner != address(0), "approve from the zero address");
        require(spender != address(0), " approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function allowance(address owner, address spender) public view virtual returns (uint256) {
        return _allowances[owner][spender];
    }


    function spendAllowance(
        address owner,
        address spender,
        uint256 amount
    ) public virtual {

=======
>>>>>>> subscribe
   
//구독취소
    function cancelSubscribe() public payable{
        require(subscribeTime[msg.sender] + 7 days >= block.timestamp , "not required to cancel");
        // require(block.timestamp > subscribeTime[msg.sender], "")
        payable(msg.sender).transfer(sub_price);
        emit Subscribed(msg.sender,block.timestamp, false);
    }

    

    function getSubsribeState(address _user) public view returns(uint){
        return subscribeTime[_user];
    }
 
    receive() external payable{
    }
}