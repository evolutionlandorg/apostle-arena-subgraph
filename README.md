## Evolution land arena subgraph

Evolution Land is a virtual simulation blockchain game that supports cross-chain interactions. This Subgraph ingests the contracts

### Install

```shell script
yarn install
graph codegen
export DEPLOY_MODE=production
python ./deploy.py
```

### Getting started with querying
The queries show most of the information that is queryable, but there are many other filtering options that can be used, just check out the [querying api](https://github.com/graphprotocol/graph-node/blob/master/docs/graphql-api.md).


### Querying

```graphql
{
    evoApostles(first: 5) {
        id
        owner
        nftType
        lastTxHash
        birthTime
        talents
        genes
        generation
        matronId
        sireId
    }
    evoEquipments(first: 5) {
        id
        owner
        object
        rarity
        level
        prefer
        apostleTokenId
        Slot
        OriginOwner
    }
}
```