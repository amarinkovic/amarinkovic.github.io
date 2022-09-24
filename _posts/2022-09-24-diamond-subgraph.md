---
title: Building a subgraph for the Diamond (EIP-2535)
date: 2022-09-24
categories: [blockchain]
tags: [ethereum,subgraph,diamond, eip2535]
hero_image_alt: "hero"
hero_image_credit_text: "zengxiao lin"
hero_image_credit_link: "https://unsplash.com/photos/fpHghJVVDKo"
---

![hero](/assets/2022-09-24/diamond.jpg)

In this post we will be looking into how to create a [subgraph](https://thegraph.com/) for your smart contracts to expose them as a GraphQL based API. This alone is not a difficult thing to do, but what we will be looking into here is how to create a subgraph for contracts implementing the [EIP-2535](https://eips.ethereum.org/EIPS/eip-2535) also known as the Diamond Standard for upgradeable smart contracts.

To give a high level overview of what we are doing here, we are using The Graph to source blockchain events into the database. We process events from the blockchain transaction logs and use these events to derive state equivalent to the one onchain. This state is stored in the databas and exposed as GraphQL API. This is particularlly useful for building Web3 frontend apps. This approach is adopted by the majority of blockchain solutions today and can be considered a standard for implementing the Web3 APIs.

## Setting up the project

You should definitelly refer to the official docs, on how to get started with developing subgraphs, but I will outline some of the key steps of the process. One of the things you will need to begin with, is the `graph-cli` which you will use to bootstrap the empty project and then build up from there. Use this command to install it:

```zsh
yarn global add @graphprotocol/graph-cli
```

Once installed it can be used to create an empty project shell. You won't need to provide any arguments, simply run:

```zsh
graph init
```

It will ask you about all the relevant choices you need to make to define the project. The setup will ask you to chose the protocol which will be processed such as `ethereum` or `near`.

An important thing will be to select the graph product you want to use. There are two options here: `subgraph-studio` and `hosted-service`. Company behind the graph obviously recommends using the studio. However, personally I prefer working locally with a hosted service running on my machin using Docker Compose.

## Locally hosted service

In my opinion this approach gives me more control over the entire system and better insight into what is going on with the code I write. The stack consists of three containers: `IPFS`, `postgres` and `subgraph`, you can use this `docker-compose` file to run it your self:

```yaml
version: '3'
services:
  graph-node:
    image: graphprotocol/graph-node
    ports:
      - '8000:8000'
      - '8001:8001'
      - '8020:8020'
      - '8030:8030'
      - '8040:8040'
    depends_on:
      - ipfs
      - postgres
    environment:
      postgres_host: ${PGHOST}
      postgres_user: ${PGUSER}
      postgres_pass: ${PGPASS}
      postgres_db: ${PGDB}
      ipfs: ipfs:5001
      ethereum: ${ETH}
      GRAPH_LOG: info
      GRAPH_POI_ACCESS_TOKEN: ${GRAPH_POI_ACCESS_TOKEN}
  ipfs:
    image: ipfs/go-ipfs:v0.4.23
    ports:
      - '5001:5001'
    volumes:
      - ./data/ipfs:/data/ipfs
  postgres:
    image: postgres
    ports:
      - '5432:5432'
    command: ["postgres", "-cshared_preload_libraries=pg_stat_statements"]
    environment:
      postgres_user: ${PGUSER}
      postgres_pass: ${PGPASS}
      postgres_db: ${PGDB}
    volumes:
      - ./data/postgres:/var/lib/postgresql/data

```

Make sure to create a `.env` file to be used with the above which will contain your sensitive information. This file would be looking something like this for example:

```zsh
GRAPH_POI_ACCESS_TOKEN=<GRAPH_POI_ACCESS_TOKEN>
PGHOST=<Postgres Host>
PGUSER=<Postgres User>
PGPASS=<Postgres Password>
PGDB=<Postgraes Database Name>
ETH=<JSON RPC Node URL>
```

Once you got those ready, you can bring it all up by executing:

```zsh
docker-compose --env-file .env up -d && docker-compose logs -f
```
