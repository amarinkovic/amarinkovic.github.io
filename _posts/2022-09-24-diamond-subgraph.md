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

In this post we will be looking into how to create a subgraph for [The Grap](https://thegraph.com/) to expose a GraphQL based API for your contracts. That on it's own is not a specifically difficult thing to do, so what we will be looking into here is to create a subgraph for contracts implementing the [EIP-2535](https://eips.ethereum.org/EIPS/eip-2535) also known as the Diamond Standard for upgradeable contracts.

