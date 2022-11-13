---
title: Build a subgraph for the Diamond (EIP-2535)
date: 2022-09-24
categories: [blockchain]
tags: [ethereum,subgraph,diamond, eip2535]
hero_image_alt: "hero"
hero_image_credit_text: "zengxiao lin"
hero_image_credit_link: "https://unsplash.com/photos/fpHghJVVDKo"
---

![hero](/assets/2022-09-24/diamond.jpg)

In this post we will see how to create a subgraph of your smart contracts for [The Graph](https://thegraph.com/) protocol. This on it's own is not particularly challenging, but we will show how to create a subgraph for contracts implementing [EIP-2535](https://eips.ethereum.org/EIPS/eip-2535), also known as the Diamond Standard for upgradeable smart contracts. The standard itself, is outside of the scope of this article, but Nick Mudge the author of this EIP, has a great series of [texts on this topic](https://dev.to/mudgen). Feel free to dive in.

Writing tests for your subgraph can speed up the development cycle significantly and this is also something we will cover in this post.

On a high level, we are using The Graph to source blockchain events into the database. We process events from the blockchain transaction logs and use these events to derive state equivalent to the one on blockchain. State is stored in the database and exposed as GraphQL API. This is particularlly useful for building Web3 frontend apps. Most major blockchain projects have adopted this approach and it can be considered a standard for implementing the Web3 APIs.

## Setting up the project

You should definitelly refer to the [official docs](https://thegraph.com/docs/en/developing/creating-a-subgraph/) on how to get started with developing subgraphs, but I will outline some of the interesting bits here. One of the things you will need to begin with, is the `graph-cli` which you will use to bootstrap an empty project skeleton. Use this command to install it:

```zsh
yarn global add @graphprotocol/graph-cli
```

Once installed, it can be used to create an empty project shell. You won't need to provide any arguments, simply run it and answer the questions asked.

```zsh
graph init
```

Setup will ask about all the relevant choices you need to make to define the project. For instance, to chose the protocol which will be processed, such as `ethereum` or `near`. You will have to chose the network for which you are building the subgraph. It can be `mainnet` or for example `goerli` for testing purposes. Most importantly you will need to provide the contract address. This is the key point here, what you provide is the address of your diamond contract.

The `init` command will create a project for you with the structure similar to this one.

```zsh
.
├── abis
│   └── Diamond.json
├── networks.json
├── package.json
├── schema.graphql
├── src
│   └── mappings.ts
├── subgraph.yaml
├── tsconfig.json
└── yarn.lock
```

## Adding the Diamond

Probably the first thing you need to do after initializing the project is obraining the Diamond ABI. Unfortunately, the CLI is not smart enough to get the diamond ABI from provided address where it is deployed, so we have to provide it ourselves. To do that you can use this convenient script which will go through your project ABIs an put them all together into one big ABI file. This file will be used to describe the diamond contract and it's event model to The Graph.

Project I used as an inspiration for this post was based on [Foundry](https://book.getfoundry.sh/). As a result of building the project, using `forge build` command, ABIs are stored by default in the `out` folder. If you are using other tools like [Hardhat](https://hardhat.org/), you might have to adapt this script a bit.

```javascript
const fs = require('fs')

const artifactsPath = './out'
const sourcePaths = [
  './src/diamonds/interfaces',
  './src/diamonds/libs'
]

let abi = []

const inlineABIs = (sourcePath) => {
  let files = fs.readdirSync(sourcePath)
  for (const file of files) {
    const jsonFile = file.replace('sol', 'json')
    let json = fs.readFileSync(`${artifactsPath}/${file}/${jsonFile}`)
    json = JSON.parse(json)
    abi.push(...json.abi)
  }
}

sourcePaths.forEach(p => inlineABIs(p))

fs.writeFileSync('./MyDiamond.json', JSON.stringify(abi))
console.log('ABI written to ./MyDiamond.json')
```

With this cumulative ABI file describing the diamond, copy the file over to the subgraph project's `abis` folder.

### Subgraph manifest

Now you can start setting up the `subgraph.yaml` file, also known as the subgraph manifest file. It points to the network, most importantly to the address of the diamond contract and specifies which events to process with which handlers. Based on this specification, an event model is generated for you to use it, to implement the even handlers which will be populating the state into the database. Here is one example file :

```yaml
specVersion: 0.0.4
description: The Example subgraph on Ethereum
repository: https://github.com/amarinkovic/am-subgraph
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum/contract
    name: AmDiamond
    network: goerli
    source:
      address: "0x3f6098Bb89C3eC0F54022C0DF381FEf923505108"
      abi: AmDiamond
      startBlock: 10371605
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.6
      language: wasm/assemblyscript
      file: ./src/mappings/diamond.ts
      entities:
        - MyEntity
      abis:
        - name: AmDiamond
          file: ./abi/MyDiamond.json
      eventHandlers:
        - event: EntityUpdated(bytes32)
          handler: handleEntityUpdated
```

One thing you might want to do is actually make this file a template. You can put in place holders to be filled in, by a templateing engine and inject the relevant values, depending to which network you want to deploy to. This might come in handy if you are developing the subgraph on a test net, and want to use the same manifest when actually deploying it to mainnet.

Create a folder `config` and in it, a file `goerli.json`. Make it have the following content:

```json
{
  "network": "goerli",
  "address": "0x3f6098Bb89C3eC0F54022C0DF381FEf923505108",
  "startBlock": 10371605
}
```

Now rename your manifest file to `subgraph.template.yaml` and replace values with keys from your configuration:

```yaml
...
dataSources:
  - kind: ethereum/contract
    name: NaymsDiamond
    network: {% raw  %}{{ network }}{% endraw %}
    source:
      address: {% raw %}'{{ address }}'{% endraw %}
      abi: NaymsDiamond
      startBlock: {% raw %}{{ startBlock }}{% endraw %}
...
```

Now you can generate the actual manifest for the network you want to deploy to with:

```zsh
mustache config/goerli.json subgraph.template.yaml > subgraph.yaml
```

## Locally hosted service

Another important thing you will need to do, is to select the graph product you want to use. There are two options here: `subgraph-studio` and `hosted-service`. Folks building The Graph obviously recommend using the studio in their cloud. At time of this writing, it is said that hosted service is sunsetting Q1 2023. Anyway, personally I prefer working locally with a hosted service running on my machine using Docker Compose.

In my opinion approach of running the entire stack locally, gives you much more control. And not only that, at early stages of development you probably just want to mess around to learn things. This is not something you want to upload online for everyone to see. For that, local stack comes in very handy. The stack consists of three containers: `IPFS`, `postgres` and `graph-node`, you can use this `docker-compose` file to run it your self:

```yaml
version: '3'
services:
  graph-node:
    image: graphprotocol/graph-node
    ports:
      - '9000:8000'   # Port for the GraphQL HTTP server
      - '9001:8001'   # Port for the GraphQL WebSocket server
      - '8020:8020'
      - '8030:8030'
      - '8040:8040'
    depends_on:
      - ipfs
      - postgres
    environment:
      postgres_host: postgres
      postgres_user: graph-node
      postgres_pass: let-me-in
      postgres_db: graph-node
      ipfs: ipfs:5001
      ethereum: '${ETH}'
      GRAPH_LOG: info
      GRAPH_POI_ACCESS_TOKEN: fire-walk-with-me
    networks:
      - local_graph_network
  ipfs:
    image: ipfs/go-ipfs:v0.4.23
    ports:
      - '5001:5001'
    volumes:
      - ./data/ipfs:/data/ipfs
    networks:
      - local_graph_network
  postgres:
    image: postgres:14-alpine
    ports:
      - '5432:5432'
    command: ["postgres", "-cshared_preload_libraries=pg_stat_statements"]
    environment:
      POSTGRES_USER: graph-node
      POSTGRES_PASSWORD: let-me-in
      POSTGRES_DB: graph-node
    volumes:
      - ./data/postgres:/var/lib/postgresql/data
    networks:
      - local_graph_network

networks:
   local_graph_network:
     driver: bridge

```

Make sure to create a `.env` file to be used with the above which will contain your sensitive information. This file would be looking something like this for example:

```zsh
ETH=<JSON RPC Node URL>
```

Once you got those ready, you can bring it all up by executing:

```zsh
docker-compose up -d && docker-compose logs -f
```
