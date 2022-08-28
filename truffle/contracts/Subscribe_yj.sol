// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

contract Subscribe_yj{
    uint256 public sub_price = 1 ether;
    mapping(address => bool) public subscribeState;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Subscribed(address indexed user, bool subcribeState);

    function setSubscribe(address _user, bool _state) internal {
        subscribeState[_user] = _state;
    }

    function subscribe() public payable{
        require(msg.value >= sub_price, "lack of balance, need to charge");
        // require(subscribeState[msg.sender] != false , "already subscribed");
        payable(address(this)).transfer(msg.value);
        setSubscribe(msg.sender, true);
        emit Subscribed(msg.sender, true);
    }
      
    function cancelSubscribe() public payable{
        require(subscribeState[msg.sender] == true, "not required to cancel");
        payable(msg.sender).transfer(sub_price);
        setSubscribe(msg.sender, false);
        emit Subscribed(msg.sender, false);
    }

    function getSubsribeState(address _user) public view returns(bool){
        return subscribeState[_user];
    }
 
    receive() external payable{
    }
}