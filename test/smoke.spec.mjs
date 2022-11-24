/* eslint-env browser */
/* globals describe, expect, it */

import {
  ApiSession,
  Contract,
  ContractRegistry,
} from "@buidlerlabs/hashgraph-venin-js";
import BigNumber from "bignumber.js";

describe("BrowserSmoke", function () {
  it("a simple contract given by path can be compiled, uploaded and executed with the result returned", async () => {
    const { session } = await ApiSession.default();
    const contract = await Contract.newFrom({ path: "hello_world.sol" });
    const liveContract = await session.upload(contract);
    const greetResponse = await liveContract.greet();

    expect(greetResponse).toEqual("Hello World!");
  }, 30000);

  it("a simple contract given by code can be compiled, uploaded and executed with the result returned", async () => {
    const code = `
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.9;

    contract HelloWorld {
      string public greet = "Hello World from code!";
    }`;
    const { session } = await ApiSession.default();
    const contract = await Contract.newFrom({ code });
    const liveContract = await session.upload(contract);
    const greetResponse = await liveContract.greet();

    expect(greetResponse).toEqual("Hello World from code!");
  }, 30000);

  it("given a solidity file with a simple contract, its ABI should be generated allowing for, in browser, session live-contract retrievals", async () => {
    const { session } = await ApiSession.default();
    // Note: this contract has been deployed on testnet only
    const liveContract = await session.getLiveContract({
      abi: ContractRegistry.HelloWorld,
      id: "0.0.30840469",
    });
    const greetResponse = await liveContract.greet();

    expect(greetResponse).toEqual("Hello ABI World!");
  });

  it("a dapp should allow big-numbers to work both as arguments and as returned values", async () => {
    const { session } = await ApiSession.default();
    const contract = await Contract.newFrom({ path: "bignumbers.sol" });
    const liveContract = await session.upload(contract);
    const plainNumberResponse = await liveContract.grr(42);
    const bigNumberResponse = await liveContract.grr(new BigNumber(82));
    const queryResponse = await liveContract.mrr();

    expect(plainNumberResponse).toBeInstanceOf(BigNumber);
    expect(bigNumberResponse).toBeInstanceOf(BigNumber);
    expect(queryResponse).toBeInstanceOf(BigNumber);
  }, 60000);

  it("the online compiler should allow for library-linking to work", async () => {
    const { session } = await ApiSession.default();
    const contract = await Contract.newFrom({
      path: "library_linking.sol",
      libraries: { Search: "0.0.48019412" },
    });
    const liveContract = await session.upload(contract, [0, 42, 69]);
    const existingResult = await liveContract.search(42);
    const nonExistingResult = await liveContract.search(70);

    expect(existingResult.isEqualTo(1)).toBeTrue();
    expect(nonExistingResult.isEqualTo(-1)).toBeTrue();
  }, 60000);
});
