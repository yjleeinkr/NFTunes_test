// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

contract Subscribe_yj{
    uint256 public sub_price1 = 1 ether;
    uint256 public sub_price3 = 2.5 ether;
    uint256 public sub_price6 = 5 ether;

    mapping(address => bool) public subscribeState;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Subscribed(address indexed user, bool subcribeState);

    function setSubscribe(address _user, bool _state) internal {
        subscribeState[_user] = _state;
    }

    function subscribe1() public payable{
        require(msg.value >= sub_price1, "lack of balance, need to charge");
        // require(subscribeState[msg.sender] != false , "already subscribed");
        payable(address(this)).transfer(msg.value);
        setSubscribe(msg.sender, true);
        emit Subscribed(msg.sender, true);
    }

    function subscribe3() public payable{
        require(msg.value >= sub_price3, "lack of balance, need to charge");
        // require(subscribeState[msg.sender] != false , "already subscribed");
        payable(address(this)).transfer(msg.value);
        setSubscribe(msg.sender, true);
        emit Subscribed(msg.sender, true);
    }

    function subscribe6() public payable{
        require(msg.value >= sub_price6, "lack of balance, need to charge");
        // require(subscribeState[msg.sender] != false , "already subscribed");
        payable(address(this)).transfer(msg.value);
        setSubscribe(msg.sender, true);
        emit Subscribed(msg.sender, true);
    }
      
    function cancelSubscribe1() public payable{
        require(subscribeState[msg.sender] == true, "not required to cancel");
        payable(msg.sender).transfer(sub_price1);
        setSubscribe(msg.sender, false);
        emit Subscribed(msg.sender, false);
    }

    function cancelSubscribe3() public payable{
        require(subscribeState[msg.sender] == true, "not required to cancel");
        payable(msg.sender).transfer(sub_price3);
        setSubscribe(msg.sender, false);
        emit Subscribed(msg.sender, false);
    }

    function cancelSubscribe6() public payable{
        require(subscribeState[msg.sender] == true, "not required to cancel");
        payable(msg.sender).transfer(sub_price6);
        setSubscribe(msg.sender, false);
        emit Subscribed(msg.sender, false);
    }

    function getSubsribeState(address _user) public view returns(bool){
        return subscribeState[_user];
    }
 
    receive() external payable{
    }
}