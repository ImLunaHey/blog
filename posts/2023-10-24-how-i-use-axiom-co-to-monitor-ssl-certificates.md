---
title: How I Use axiom.co to Monitor SSL Certificates
slug: how-i-use-axiom-co-to-monitor-ssl-certificates
description: ''
published_date: 2023-10-24T05:13:43.886Z
created_date: 2023-10-24T05:13:43.887Z
modified_date: 2023-10-24T05:13:43.887Z
preview: /assets/images/ct-logs-dashboard-screenshot.png
draft: false
tags: []
categories: []
authors:
  - ImLunaHey
  - chatGPT
---

## The 'Why' Behind ct-logs

Hey folks, today we're diving into something that I've been geeking out about—SSL certificates and the overall security trends on the web. I created ct-logs out of sheer curiosity and a knack for data. I wanted to answer questions like:

- Who's issuing the most certs?
- How's SSL usage evolving?
- Are fake or hacked websites on the rise?

And the list goes on. With ct-logs, I can not only monitor these things but also plot them on a graph, because who doesn't love a good visualization?

![ct-logs dashboard on [axiom.co](https://axiom.co)](/assets/images/ct-logs-dashboard-screenshot.png)

## A Shoutout to axiom.co (and a Disclaimer)

Before we get too deep, let me just say [axiom.co](https://axiom.co) has been a breeze to work with. The platform makes it super simple to analyze the tons of data that ct-logs collects. A quick disclaimer: I work at [axiom.co](https://axiom.co), but that doesn't make my love for the platform any less genuine!

## The Technical Nitty-Gritty

ct-logs runs on Railway.app and uses Bun as the runtime. It scrapes data from [certstream.calidog.io](https://certstream.calidog.io), and I've got to be honest, their WebSocket connection is more fragile than my grandma's antique vase. It breaks—a lot. So much so that I'm contemplating creating my own CT logger. Stay tuned for updates on that front.

## Eye-Opening Discoveries

While diving into this data-rich ocean, I've come across some insights that just blew my mind. First up, let's talk about Let's Encrypt. These folks are not just ahead of the curve, they're practically defining it. We're talking about a staggering 1.6 billion certificates every 90 days! That's not just a number; it's a statement about the rapid adoption and democratization of web security.

But it's not all roses and sunshine. While monitoring, I've also found an alarming number of fake and malicious websites mimicking popular sites like Facebook. This is a stark reminder of the ongoing cat-and-mouse game between security experts and cybercriminals.

And let's not forget about hacked websites. Yes, those still exist, and they serve as cautionary tales about the importance of robust security measures.

What fascinates me the most is the ability to run custom queries to explore different angles, such as:

- Tracking the uptick in SSL usage over specific periods.
- Identifying patterns related to domain registration with sketchy top-level domains (TLDs).
- Analyzing the rate at which expired certificates get renewed (or not).

If you're a developer or have some tech background, you're in the right place. I'll be sharing code snippets, queries, and all that jazz in future posts.

## The Road Ahead

I've got heaps of ideas for what I can do with this data, from analyzing internet trends to identifying security lapses in real-time. And yes, I plan on sharing all of it right here, so make sure to stay tuned.

## Wrapping Up

So that's a quick dive into how I'm using [axiom.co](https://axiom.co) and ct-logs to keep tabs on the ever-changing world of SSL certificates. If you're as curious as I am, check out the [ct-logs GitHub repo](https://github.com/imlunahey/ct-logs). It's MIT-licensed, so feel free to mess around with it.
