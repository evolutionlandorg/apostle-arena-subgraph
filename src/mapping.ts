import { BigInt } from "@graphprotocol/graph-ts"
import {
  objectOwnership,
  LogSetAuthority,
  RoleAdded,
  RoleRemoved,
  Transfer,
  Approval,
  ApprovalForAll
} from "../generated/objectOwnership/objectOwnership"
import { ExampleEntity } from "../generated/schema"

export function handleLogSetAuthority(event: LogSetAuthority): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.authority = event.params.authority

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.supportsInterface(...)
  // - contract.name(...)
  // - contract.getApproved(...)
  // - contract.totalSupply(...)
  // - contract.InterfaceId_ERC165(...)
  // - contract.CONTRACT_WATER_ERC20_TOKEN(...)
  // - contract.hasRole(...)
  // - contract.CONTRACT_GOLD_ERC20_TOKEN(...)
  // - contract.tokenOfOwnerByIndex(...)
  // - contract.CONTRACT_RING_ERC20_TOKEN(...)
  // - contract.CONTRACT_TOKEN_LOCATION(...)
  // - contract.exists(...)
  // - contract.tokenByIndex(...)
  // - contract.CONTRACT_WOOD_ERC20_TOKEN(...)
  // - contract.CONTRACT_FIRE_ERC20_TOKEN(...)
  // - contract.ROLE_AUTH_CONTROLLER(...)
  // - contract.ownerOf(...)
  // - contract.CONTRACT_LAND_BASE(...)
  // - contract.balanceOf(...)
  // - contract.registry(...)
  // - contract.CONTRACT_INTERSTELLAR_ENCODER(...)
  // - contract.CONTRACT_SOIL_ERC20_TOKEN(...)
  // - contract.symbol(...)
  // - contract.CONTRACT_OBJECT_OWNERSHIP(...)
  // - contract.authority(...)
  // - contract.tokenURI(...)
  // - contract.ROLE_ADMIN(...)
  // - contract.isApprovedForAll(...)
  // - contract.mintObject(...)
  // - contract.burnObject(...)
}

export function handleRoleAdded(event: RoleAdded): void {}

export function handleRoleRemoved(event: RoleRemoved): void {}

export function handleTransfer(event: Transfer): void {}

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}
