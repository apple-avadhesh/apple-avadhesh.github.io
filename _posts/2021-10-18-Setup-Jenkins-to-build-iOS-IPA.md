---
title: Setup Jenkins to build iOS .IPA
author: avadhesh
date: 2021-11-18 14:10:00 +0800
categories: [Jenkins]
tags: [jenkins]
render_with_liquid: false
---

## Jenkins Installation

### Step 1:

Install the Java environment before installing Jenkins.

```
work@avadheshs-MacBook-Pro ~ % java -version
java version "1.8.0_281"
Java(TM) SE Runtime Environment (build 1.8.0_281-b09)
Java HotSpot(TM) 64-Bit Server VM (build 25.281-b09, mixed mode)
```

If it ain’t installed you would get an error (Unable to locate a Java Runtime).

Download Link for Java: [https://www.java.com/en/download/](https://www.java.com/en/download/)

### Step 2:

Download the Jenkins from the official portal.

Link: [https://www.jenkins.io/download/lts/macos/](https://www.jenkins.io/download/lts/macos/)

or

Installation Commands:

- Install the latest LTS version: `brew install jenkins-lts` 
- Install a specific LTS version: `brew install jenkins-lts@YOUR_VERSION` 
- Start the Jenkins service: `brew services start jenkins-lts`  
- Restart the Jenkins service: `brew services restart jenkins-lts` 
- Update the Jenkins version: `brew upgrade jenkins-lts` 

From the above commands install the latest LTS version and start the service.

After starting the Jenkins service, browse to the location: [http://localhost:8080/](http://localhost:8080/)

![Screenshot-2021-01-23-at-6.40.49-PM-1024x605](//images.contentful.com/uhmar3aa2ux0/4sp0GwOVqR2d2LbvYOKrD1/b9ff151de70bd1ab6ad5ccf7e57fd0fd/Screenshot-2021-01-23-at-6.40.49-PM-1024x605.png)

- Copy the password from the directory path (/Users/work/.jenkins/secrets/initialAdminPassword)
- Choose to install the suggested plugins.

![Screenshot-2021-01-23-at-6.46.15-PM-1024x605](//images.contentful.com/uhmar3aa2ux0/5UcFP3FKX6Sr1KMbfq645L/ac2fa795b4ca9df730c079df434f101b/Screenshot-2021-01-23-at-6.46.15-PM-1024x605.png)

- Wait until all the recommended plugins are installed.

![Screenshot-2021-01-23-at-6.50.13-PM-1024x605](//images.contentful.com/uhmar3aa2ux0/1NTCC57IwxLtdJ6CxdXCXx/54778f176a79735c376e90b3edd57193/Screenshot-2021-01-23-at-6.50.13-PM-1024x605.png)

- Once all the plugins are installed it’ll automatically be redirected to the user creation page.

![Screenshot-2021-01-23-at-8.09.53-PM-1024x610](//images.contentful.com/uhmar3aa2ux0/2pjgvJvaOVBaKIP4zHnSRc/55d79c0266eed51cc7c5972daa360868/Screenshot-2021-01-23-at-8.09.53-PM-1024x610.png)

Click __‘Save and Continue‘__ to complete the registration.

## Jenkins Configuration

Some plugins could not be loaded due to unsatisfied dependencies.

![Screenshot-2021-01-23-at-8.19.31-PM-1024x605](//images.contentful.com/uhmar3aa2ux0/1m0xedQtPsBkynTn4E2bwo/c769dd9df13889334dd1203285f33d4a/Screenshot-2021-01-23-at-8.19.31-PM-1024x605.png)

Until the user is created, you can restart Jenkins, Jenkins, and log in with the account you just created or the admin account. Restart the Jenkins method, type in the command line jenkins-lts and press Enter.

## iOS Related Plugins Installation

### Step 1:

iOS packaging requires access to certificates, description files, etc. in the keychain, so we need to install the keychain and description file plugins. Go to Jenkins-> Manage Jenkins-> System Configuration-> Manage Plugins to install related plugins, and you can filter and search through the upper right corner. Then select the plug-in to be installed, check it, and install it. After the installation is successful, you can choose whether to restart Jenkins.

![Screenshot-2021-01-23-at-8.31.49-PM-1024x762](//images.contentful.com/uhmar3aa2ux0/71r5RUBzQvLvZv9pOvHQgH/e7d47ddb0ba3a8bc2b63c71eb4fb42cf/Screenshot-2021-01-23-at-8.31.49-PM-1024x762.png)

Now select ‘Install without Restart’ and wait for the installation to complete, then restart Jenkins.

![Screenshot-2021-01-23-at-8.38.09-PM-1024x762](//images.contentful.com/uhmar3aa2ux0/78eaQQM8y0Lkb1uaARcCeZ/1971e82115dd1d0ae4b540134c969116/Screenshot-2021-01-23-at-8.38.09-PM-1024x762.png)

## Configure Keychain Plugin

![test-Jenkins--1024x897](//images.contentful.com/uhmar3aa2ux0/7YwMQ3O9dWwhTTrkagHQu/6debbf20ae6fa0d818a74fd2537fb961/test-Jenkins--1024x897.png)

## Add Github Credentials

Credentials are needed to do a git clone. Under Credentials create a new system credential. Here for the demonstration, I’ve used the username and password of my Github account.

![Screenshot-2021-01-26-at-2.14.27-PM-1024x605](//images.contentful.com/uhmar3aa2ux0/AMrlw8wFpON28hMZSIUQN/8e96b25e53f51d6e83f18bb813a1b6a0/Screenshot-2021-01-26-at-2.14.27-PM-1024x605.png)

## Setting up a new item

Create a new Jenkins project using the __freestyle__ option and the following settings.

- Assign the project a name
- Select Git for the source-code management and choose the credential we created earlier(from the drop-down).
- By default the branch selection would-be __master__.

![Screenshot-2021-01-26-at-2.23.46-PM-1024x605](//images.contentful.com/uhmar3aa2ux0/760TkWSxidGhlWNZn3E3F4/99b978ee13e4a6ee9fde934d59e8f591/Screenshot-2021-01-26-at-2.23.46-PM-1024x605.png)

![Screenshot-2021-01-26-at-2.26.42-PM-1024x605](//images.contentful.com/uhmar3aa2ux0/5cMCTeJCbMa6OlRWeXjbjQ/3a7e48327acb542160a098ab1d202281/Screenshot-2021-01-26-at-2.26.42-PM-1024x605.png)

## Build steps to create .IPA

- Select ‘clean build before? to No‘
- Select ‘generate archive?’
- Set Xcode Schema File name.
- Select ‘Pack application, build and sign .ipa?’
  - ${BUILD_DATE} for IPA filename.
  - Output directory to ‘demoBuilds‘.
- Select ‘Advanced Xcode build options’
  - Set Xcode Project Filename.
  - Set Build Output directory to ‘/Users/work/.jenkins/workspace/JenkinsDemo/DerivedData’.
- Post Build Steps
  - Add ‘DerivedData/demoBuilds/*.ipa’ for Files to archive.
Configuration detail:
![JenkinsDemo-Config-Jenkins--e1611667357437](//images.contentful.com/uhmar3aa2ux0/5RcAArOgKE2bFwsUDJquTi/ba3062b00984c702f3c7ef95c3e8a4e0/JenkinsDemo-Config-Jenkins--e1611667357437.png)

Now click on ‘Build Now’ and wait. The result should look like this if it builds without any error. Do check the console output if the build fails.

![Screenshot-2021-01-26-at-5.15.19-PM-1024x693](//images.contentful.com/uhmar3aa2ux0/4CEXIGWHravfX6WQkH7eRX/cb911855fcfd32d9c705bde2310a78bb/Screenshot-2021-01-26-at-5.15.19-PM-1024x693.png)

And in the output directory, you would see the IPA file.

![Screenshot-2021-01-26-at-5.07.20-PM-768x471](//images.contentful.com/uhmar3aa2ux0/v7rNUtO3aX9e5NfFf85On/b479c7610ec0f303b72b080d88d920c3/Screenshot-2021-01-26-at-5.07.20-PM-768x471.png)
