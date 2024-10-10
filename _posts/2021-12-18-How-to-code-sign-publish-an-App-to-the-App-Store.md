---
title: How to code sign & publish an App to the App Store
author: avadhesh
date: 2021-12-18 14:10:00 +0800
categories: [App Store]
tags: [charles]
render_with_liquid: false
---

## Prerequisites
- Xcode compatible project(Using React-Native Project in this tutorial and Xcode 13.1).
- [App Developer Account](https://developer.apple.com/programs/), Enroll for one if you dont have it.
- Before you submit your app for review make sure you check the [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/ "App Store Review Guidelines").

## Steps

The App submission process includes
1. Register a new bundle identifier
2. Create a CSR (Certificate Signing Request)
3. Create an `App Store` Production Certificate
4. Create a Production Provisioning Profile (To read more about code signing [click here](https://developer.apple.com/library/archive/documentation/Security/Conceptual/CodeSigningGuide/Introduction/Introduction.html))
5. Create an app onto the App Store Connect ([For more info](https://developer.apple.com/support/app-store-connect "app-store-connect-tutorial"))
6. Upload the app binary with any `Upload tools.` ([Click Here](https://help.apple.com/app-store-connect/#/devb1c185036) to learn more)
7. Fill in the app’s metadata, version information and submit the app for review

## 1. Register a new bundle identifier

__1.1__ You'd need a bundle ID to create an app. Only an account holder can create one. (Read more about roles [here](https://developer.apple.com/support/roles/))
- To create a Bundle Id, goto [developer portal](https://developer.apple.com/account/resources/identifiers/bundleId/add/), check services the app needs. (In this app I'm enabling services for `Push Notifications` and `Sign In with Apple`) and click `Save`

![BundleId_Appstore](https://images.ctfassets.net/uhmar3aa2ux0/644NeQNPAcEWfCfA0tbT16/314fe0a32393e2d7e98691d923da8374/Screenshot_2021-12-10_at_2.12.28_PM.png)

## 2. Create a CSR (Certificate Signing Request)

- Open __Keychain Access__
- Select __Keychain Access__ > __Certificate Assistant__ > __Request a Certificate From a Certificate Authority…__ from the menu.
![Create_CSR](https://images.ctfassets.net/uhmar3aa2ux0/1E3s3ZNOoWusbt2XriJCjn/89bdad1e50d3bb8d35ead36c058401c8/Screenshot_2021-12-10_at_3.06.33_PM.png)
- Enter `email address`, `Common Name`, check the `Saved to disk` radio button and click continue.![Certificate_Assistant](https://images.ctfassets.net/uhmar3aa2ux0/6gwfc3eQVAxkpRV2Ietri0/128bea3075361edbcaafb79cf6c5f8db/Screenshot_2021-12-10_at_3.12.47_PM.png)
- Save __CSR__ - A dialog would appear once you click continue 

## 3. Create an App Store Production Certificate

- Goto [Developer Portal](https://developer.apple.com/account/resources/identifiers/bundleId/add/)
- Click `Certificates, Identifiers & Profiles`
- Create a New Certificate
- Select `iOS Distribution (App Store and Ad Hoc)`
![Certificate_type_selection](https://images.ctfassets.net/uhmar3aa2ux0/4D2QacJzQTxL1L9RNTZnRc/3c964516392008be52ccaa34b1d8da3c/Screenshot_2021-12-11_at_12.48.21_PM.png)
- Click on `Choose File` to upload the `CSR` file that was created using Keychain's `Certificate` Assistant` and Click Continue
![CreateNewCertificate_CSR_upload](https://images.ctfassets.net/uhmar3aa2ux0/1d1UqTQu2z7uv3S1LTnOSO/a4109de1578a836053ad01dade0a2f2f/Screenshot_2021-12-11_at_12.52.33_PM.png)
- Now, you can `Download` the generated iOS Distribution Certificate
![Download_iOS_Distribution_Certificate](https://images.ctfassets.net/uhmar3aa2ux0/2KG49fSGChcEOXzWaDDpp7/3e78ca5eaa57158df6b967d95fbf66c9/Screenshot_2021-12-11_at_12.53.33_PM.png)

## 4. Create a Production Provisioning Profile
- Goto [Developer Portal](https://developer.apple.com/account/resources/identifiers/bundleId/add/)
- Click on `Profiles` and generate a new one
- Check `App Store` radio button and click `Continue`
![Select Provising Profile Type](https://images.ctfassets.net/uhmar3aa2ux0/6jxvWrnnB4awlvMkPSOrsp/d78ab6853297870bb2829f764ebd5030/Screenshot_2021-12-11_at_1.06.24_PM.png)
- Select the `App Id` from the dropdown list and click `Continue`
![Select App Id for Provising Profile](https://images.ctfassets.net/uhmar3aa2ux0/7cBFRVxH1DGoyCy632hzPQ/1c15630b954f82e7a8389f855005f3e3/Screenshot_2021-12-11_at_1.09.53_PM.png)
- Select the Distribution Certificate and click `Continue`
![Select Certificate for Provising Profile](https://images.ctfassets.net/uhmar3aa2ux0/XTG1zjzUYT2ytBL6OW8AG/23d5a7d545f135f706226f7f29030eab/Screenshot_2021-12-11_at_1.10.31_PM.png)
- Enter a name for the `Provising Profile` and click `Generate`
![Generate Provisioning Profile](https://images.ctfassets.net/uhmar3aa2ux0/6Wi3GIYR41Fo2sVBvRHyJp/a1462f307d98fc9319fb00a612918be8/Screenshot_2021-12-11_at_1.12.18_PM.png)
- Now, you can `Download` the generated `Provising Profile`
![Download Provising Profile](https://images.ctfassets.net/uhmar3aa2ux0/1UtXvS91xxPSMpwftX5Pk5/ef041f715b857e11a91a5cdc97bf2a01/Screenshot_2021-12-11_at_1.12.41_PM.png)

## 5. Create an app onto the App Store Connect
__5.1__ Click on '+' Icon and create a new app, Fill in all the fields and click `Create`
![Create App onto App Store](https://images.ctfassets.net/uhmar3aa2ux0/5qwL8LZSp9xwNruHRdVp6w/6a0801c67e77af9a34575d204631d02e/Screenshot_2021-12-11_at_1.40.07_PM.png)

## 6. Upload the app binary with any Upload tools.
I'm using Xcode to upload the binary in this tutorial

- Select `Any iOS device` from the Device drop-down list
- Click __Product__ > __Archive__ from the menu
- Once it is succefully archived click on `Distribute App`
![export_upload_app_distribution](https://images.ctfassets.net/uhmar3aa2ux0/rvDX7SqWFVAMGRPeKHCCm/8abf5527104551d661f769d07b9265ad/Screenshot_2021-12-12_at_1.54.24_AM.png)
> __Note to Self__: Tried uploading binary directly to App Store Connect but it was taking so long to upload. So I exported IPA and uploaded using __Transporter__.
![Build_Uploaded_Transporter](https://images.ctfassets.net/uhmar3aa2ux0/6Uf0RvTj2YEaL7PKYPLPu6/e6c48000c077563ee5e51ccf1c8f9d40/Screenshot_2021-12-12_at_1.55.35_AM.png)

## 7. Fill in the app’s metadata, version information and submit the app for review
Under the “App Store” tab in App Store Connect, in the “App Information” page you can add additional languages, categories, description your app’s Privacy Policy URL and select the build.
Now you’re ready to `Submit for Review`.

Voila!! App is submitted now and the status changed to __Waiting for Review__ (Check the build status under the `Version History` section)

![Waiting_for_review](https://images.ctfassets.net/uhmar3aa2ux0/711kd21Ifb3hK0F1UcliRE/06efd5c313808b42476c89238ed0c0c9/Screenshot_2021-12-18_at_1.18.09_AM.png)
