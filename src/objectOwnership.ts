import {BigInt, BigDecimal, Address, log} from "@graphprotocol/graph-ts"

import {
  Transfer,
} from "../generated/objectOwnership/objectOwnership"


import {
  Birth,
} from "../generated/apostle/apostle"

import {evoApostle} from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  let id = event.params._tokenId.toHex()
  let apostle = evoApostle.load(id)

  if (apostle == null){
    apostle = new evoApostle(id)
  }
  apostle.nftType = getAssetTypeByTokenId(id)
  if (apostle.nftType !== "Apostle"){
    return
  }
  log.info("update apostle id={}; owner={}; birthTime={}", [id, event.params._to.toHex(), apostle.birthTime.toString()])
  apostle.lastTxHash = event.transaction.hash.toHex()
  apostle.owner = event.params._to.toHex()
  apostle.save()
}

export function handleBirth(event: Birth): void {
  let id = event.params.apostleTokenId.toHex()
  let apostle = evoApostle.load(id)

  if (apostle == null){
    apostle = new evoApostle(id)
  }
  log.info("new apostle {}, birthTime={}; talents={}", [id, event.params.birthTime.toString(), event.params.talents.toString()])
  apostle.nftType = "Apostle"
  apostle.lastTxHash = event.transaction.hash.toHex()
  apostle.owner = event.params.owner.toHex()
  apostle.birthTime = event.params.birthTime
  apostle.talents = event.params.talents.toString()
  apostle.genes = event.params.genes.toString()
  apostle.generation = event.params.generation.toString()
  apostle.matronId = event.params.matronId.toString()
  apostle.sireId = event.params.sireId.toString()
  apostle.save()
}

function getAssetTypeByTokenId(tokenId: string): string {
  // @ts-ignore
  // todo need use tokenId >>192 && 255
  switch (parseI32(tokenId.substr(17, 1))) {
    case 1:
      return "Land"
    case 2:
      return "Apostle"
    default:
      return "Other"
  }
}
