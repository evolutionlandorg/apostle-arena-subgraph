import {BigInt, BigDecimal, Address} from "@graphprotocol/graph-ts"

import {
    Equip,Divest
} from "../generated/apostle/apostle"

import {evoEquipment, evoApostleEquipment} from "../generated/schema"

export function handleEquip(event: Equip): void {
    let apostleEquipment = new evoApostleEquipment(event.transaction.hash.toHex())
    apostleEquipment.apostleTokenId = event.params._apo_id.toHex()
    apostleEquipment.tokenId = event.params._equip_token.toHex()
    apostleEquipment.type = "equip"
    apostleEquipment.save()
}

export function handleDivest(event: Divest): void {
    let apostleEquipment = new evoApostleEquipment(event.transaction.hash.toHex())
    apostleEquipment.apostleTokenId = event.params._apo_id.toHex();
    apostleEquipment.tokenId = event.params._equip_token.toHex()
    apostleEquipment.type = "divest"
    apostleEquipment.save()
}