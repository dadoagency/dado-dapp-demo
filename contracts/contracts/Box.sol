pragma solidity ^0.7.3;

contract Box {
    // store a value
    // retrieve a value

    uint256 value;

    function storeValue(uint256 newValue) public {
        value = newValue;
    }

    function retrieveValue() public view returns (uint256) {
        return value;
    }
}
