// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

import { ISystemHook } from "./ISystemHook.sol";
import { WorldContextConsumer } from "./../WorldContext.sol";

interface IWorldRegistrationSystem {
  function registerNamespace(bytes16 namespace) external;

  function registerSystemHook(bytes32 resourceSelector, ISystemHook hook) external;

  function registerSystem(bytes32 resourceSelector, WorldContextConsumer system, bool publicAccess) external;

  function registerFunctionSelector(
    bytes32 resourceSelector,
    string memory systemFunctionName,
    string memory systemFunctionArguments
  ) external returns (bytes4 worldFunctionSelector);

  function registerRootFunctionSelector(
    bytes32 resourceSelector,
    bytes4 worldFunctionSelector,
    bytes4 systemFunctionSelector
  ) external returns (bytes4);

  function registerDelegation(
    address delegatee,
    bytes32 delegationControlId,
    bytes memory initFuncSelectorAndArgs
  ) external;
}
