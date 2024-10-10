---
title: Setting up Webhook on localhost using ngrock (Jenkins)
author: avadhesh
date: 2021-11-17 14:10:00 +0800
categories: [Github]
tags: [ngrock, github, jenkins]
render_with_liquid: false
---

## Automate build on code commit

### 1. Ngrock Setup

- Download ngrok for Mac OS
- unzip and connect your account using terminal commands
- Start the service using ./ngrok http 8080
- Copy the Forwarding URL

![Screenshot-2021-01-27-at-2.06.40-PM-1024x752](https://images.contentful.com/uhmar3aa2ux0/5rh9ldYIZC8VSmxHuhCMm7/6bed29b953efd312697bc48c511d518f/Screenshot-2021-01-27-at-2.06.40-PM-1024x752.png)

### 2. Jenkins Configuration

It listens for requests at the hook URL. We need to give this URL to the GitHub repository. Jenkins will run the build process whenever code is pushed to the repository.

- Open Dashboard
- Go to Manage Jenkins > Configure System.
- Under GitHub select the ‘Advanced‘ tab.
- Check ‘Specify another hook URL for GitHub configuration‘ and paste the Forwarding URL copied from the terminal.
- Go to item configuration and underbuild trigger tab, check ‘GitHub hook trigger for GITScm polling‘

![Screenshot-2021-01-27-at-2.16.57-PM-1024x644](https://images.contentful.com/uhmar3aa2ux0/5XRTtfgplcCLlALmZiUsX2/2fd6e69ff3e7af0219af9bb84fad668a/Screenshot-2021-01-27-at-2.16.57-PM-1024x644.png)

![Screenshot-2021-01-27-at-2.38.33-PM-1024x711](https://images.contentful.com/uhmar3aa2ux0/3FWHVu4G34tExwgFoaBloI/536f985d51fcd58f9afc9d6bb87934de/Screenshot-2021-01-27-at-2.38.33-PM-1024x711.png)

### 3. GitHub Repository Configuration

- Open Github Repository
- Click ‘Settings‘
- Click ‘Webhooks‘
- Click ‘Add webhook‘
- Paste the Forwarding URL in ‘Payload URL‘
- Only push events will be triggered with this webhook
- Click ‘Add webhook‘

![Screenshot-2021-01-27-at-2.18.00-PM-1024x789](https://images.contentful.com/uhmar3aa2ux0/7gYvC5W4Q2VOU7NYJe76VO/be68c04693fc4c0c563589ecc4f17657/Screenshot-2021-01-27-at-2.18.00-PM-1024x789.png)

Now try to commit and if everything goes well it will build automatically.

![Screenshot-2021-01-27-at-2.25.28-PM-1024x696](https://images.contentful.com/uhmar3aa2ux0/5rDiQnwMjyQ3Ym1lMpXJ1p/4a67db6251718bd0395a0c93b470532b/Screenshot-2021-01-27-at-2.25.28-PM-1024x696.png)
