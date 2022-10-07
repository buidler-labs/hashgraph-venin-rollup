// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

library Search {
  function indexOf(int[] storage self, int value) public view returns(int) {
    for (uint i = 0; i < self.length; i++) if (self[i] == value) return int(i);
    return -1;
  }
}

contract LibraryLinking {
  using Search for int[];

  int[] data;

  constructor(int[] memory arr) {
    for (uint i = 0; i < arr.length; i++) data.push(arr[i]);
  }

  function search(int value) public view returns (int) {
    return data.indexOf(value);
  }
}