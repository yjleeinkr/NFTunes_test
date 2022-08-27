// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;


// import "./Approve.sol";
import "./node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";


contract Subscribe is Ownable{

    // Approve public Sign;

    uint256 firstPayment;
    uint256 nextPayment;
    address marketOwner; //0x456F37fB5Ae3c15D98fd5deBa93121B5435f9A50
    address public approver;
    uint256 public sub_price = 1 ether;

    mapping(address => bool) public subscribeState;
    mapping(address => mapping(address => uint256)) private _allowances;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Transfer(address indexed from, address indexed to, uint256 value);

    function setUserState(address _owner, bool _state) public{
        subscribeState[_owner] = _state;
    }


    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {
        require(from != address(0), "transfer from the zero address");
        require(to != address(0), "transfer to the zero address");

        emit Transfer(from, to, amount);
    }

    
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual returns (bool) {

        spendAllowance(from, approver, amount);

        _transfer(from,to,amount);
        return true;
    }

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

   
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "ERC20: insufficient allowance");
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }




  



    

}