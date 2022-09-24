---
title: Building a subgraph for the Diamond
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