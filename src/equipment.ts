import {
    Enchanced, Crafted
} from "../generated/equipment/craftBase"
import {evoEquipment} from "../generated/schema";
import {log} from "@graphprotocol/graph-ts";


export function handleCrafted(event: Crafted): void {
    let id = event.params.tokenId.toHex()
    let equipment = evoEquipment.load(id)
    if (equipment == null){
        equipment = new evoEquipment(id)
    }
    log.info("new equipment {}", [id])
    equipment.owner = event.params.to.toHex()
    equipment.OriginOwner = equipment.owner
    equipment.rarity = event.params.rarity.toI32()
    equipment.level = 0
    equipment.prefer = event.params.prefer.toI32()
    equipment.object = event.params.obj_id.toI32()
    equipment.owner = event.params.to.toHex()
    equipment.save()
}

export function handleEnchanced(event: Enchanced): void {
    let id = event.params.id.toHex()
    let equipment = evoEquipment.load(id)
    if (equipment == null){
        equipment = new evoEquipment(id)
    }
    log.info("new up equipment {}", [id])
    equipment.level = event.params.level
    equipment.save()
}