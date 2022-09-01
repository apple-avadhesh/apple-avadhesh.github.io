---
title: iOS Packet Capture using Charles
author: avadhesh
date: 2021-10-24 14:10:00 +0800
categories: [debugging]
tags: [charles]
render_with_liquid: false
---

## Charles

It is a paid __web debugging proxy__ application with a 30days trial period. Within the trial period, it will forcibly quit after every 30mins of use, though it can be used again after restarting.

> __Note:__ Be safe and don’t download the cracked version of this software.

## Installation on macOS

The downloadable package can be obtained from the official website of Charles ([https://www.charlesproxy.com/download/](https://www.charlesproxy.com/download/))

## iPhone Proxy Configuration

__Goto:__ Settings -> Wi-Fi -> [Select Wi-fi] -> Configure Proxy -> [Manual]

![Screenshot-2021-02-12-at-10.00.58-PM-184x300](//images.contentful.com/uhmar3aa2ux0/38VNIA0IwlNULcl9Xm9N83/b277da23992c23373e2e6c229e7a6162/Screenshot-2021-02-12-at-10.00.58-PM-184x300.png)

Manual Proxy requires __Server Address__ and __Port Number__ which can be obtained from Charles.

1. Help Menu -> Local IP Address  2. Proxy Menu -> Proxy Settings

![Screenshot-2021-02-12-at-10.06.57-PM-1024x704](//images.contentful.com/uhmar3aa2ux0/4GFJt2ka4vDyvbd9fQxJGD/c828642f56e05b930aa0d430e4e1e03e/Screenshot-2021-02-12-at-10.06.57-PM-1024x704.png)

![Screenshot-2021-02-12-at-10.14.40-PM-768x692](//images.contentful.com/uhmar3aa2ux0/6FVOly9hOnpAm1gPtl3KhG/b10e298e6879568456c948ba9bf31386/Screenshot-2021-02-12-at-10.14.40-PM-768x692.png)

Once you are done with the proxy configuration, Charles will prompt a connection popup, click ‘__Allow__‘. Now you can see Charles capturing requests from the iPhone.

![Screenshot-2021-02-07-at-10.46.38-PM-1024x321](//images.contentful.com/uhmar3aa2ux0/5BovYnVc7pUNkQX47ScSLF/17e132df6f4701bb9a5a35fc2419f4b8/Screenshot-2021-02-07-at-10.46.38-PM-1024x321.png)

> To capture the request sent from the iPhone, it is necessary to ensure that the iPhone and the PC are connected to the same local area network.

## Capture HTTP request

After configuring the iPhone proxy, you can preview the HTTP request. As HTTPS request is encrypted, only garbled data can be previewed. To preview the plaintext of the HTTPS requests, Charles root certificates need to be installed on Mac and iPhone.

1. __Root certificate installation on a mac__

__Goto:__ Help Menu -> SSL Proxying -> Install Charles Root Certificate

The certificate can be viewed in Keychain. Double click the certificate and set ‘__Always Trust__’.

![Screenshot-2021-02-12-at-10.57.14-PM-1024x831](//images.contentful.com/uhmar3aa2ux0/5s5HKUBCea525UKXbgidZF/7d81b76119a9f4be0ef48493f435c860/Screenshot-2021-02-12-at-10.57.14-PM-1024x831.png)

2. __Root certificate installation on iPhone__

__Goto:__ Help Menu -> SSL Proxying -> Install Charles Root Certificate on a Mobile Device or Remote Browser

![Screenshot-2021-02-12-at-11.01.24-PM-1024x337](//images.contentful.com/uhmar3aa2ux0/5fDJNd1WjyvrtQZJp2ap5I/979ba6703a9e09419c61ba01709eaa50/Screenshot-2021-02-12-at-11.01.24-PM-1024x337.png)

After the certificate is installed and trusted, you need to enable the root certificate on the iPhone.

__Goto:__ iPhone Settings -> About -> Certificate Trust Settings -> Enable Charles root certificate.

![Screenshot-2021-02-12-at-11.12.13-PM-628x1024](//images.contentful.com/uhmar3aa2ux0/2QQC86PIlp3Iq6ZotmKmuO/e1e8519bb1a533d40c9e5258b3e94357/Screenshot-2021-02-12-at-11.12.13-PM-628x1024.png)

Now you can use Charles to capture the HTTPS request sent by the iPhone and preview the plaintext data.

Before that, you need to enable __SSL proxying__ on the request.

![Screenshot-2021-02-12-at-11.19.25-PM-977x1024](//images.contentful.com/uhmar3aa2ux0/2TGlpMKfoIWrLPBcRBGPEX/11db02d63006d06818cd83ec20a08276/Screenshot-2021-02-12-at-11.19.25-PM-977x1024.png)

__Plaintext Preview of JSON body in Charles__

![Screenshot-2021-02-12-at-11.25.16-PM-1024x814](//images.contentful.com/uhmar3aa2ux0/5V6afWy6GXgpHPWMnTvcie/404788e7d6586e9a82731ff3ad83e630/Screenshot-2021-02-12-at-11.25.16-PM-1024x814.png)

__Voila__ 🙌  🎉
