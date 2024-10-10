---
title: Xcode Static Analysis
author: avadhesh
date: 2021-12-02 14:10:00 +0800
categories: [Xcode]
tags: [static analysis]
render_with_liquid: false
---

## Static Analysis

Xcode provides a static analysis tool that can detect potential problems such as localized text, logical problems, memory problems, issues, and data syntax problems, etc. 

To perform static code analysis: Select -> Product > Analyze ( command + shift + B )

![Screenshot-2020-09-29-at-11.29.17-PM-179x300](//images.contentful.com/uhmar3aa2ux0/5NgvzGo54uv4rjT9iaYXrQ/78b47206ba023bb17fb57acab6f0b904/Screenshot-2020-09-29-at-11.29.17-PM-179x300.png)

Enabling Analyze During 'Build' setting will allow you to start analyzing during compilation.

![Screenshot-2020-09-29-at-11.40.25-PM-768x261](//images.ctfassets.net/uhmar3aa2ux0/4fJQpVGTNK5oD4eYKyAxuI/34b198af7637a4229a7564094a3e6c7a/Screenshot-2020-09-29-at-11.40.25-PM-768x261.png)

## Localization analysis

The setting Missing Localizability options are updated to Yes in Build settings.

![Screenshot-2020-09-29-at-11.53.37-PM-768x186](//images.contentful.com/uhmar3aa2ux0/4rgycjBOUMBgZFwRMOHScH/feaed7310ec61409cdb2b2f7e2e6d149/Screenshot-2020-09-29-at-11.53.37-PM-768x186.png)

The user-facing text should use string macros. If we directly assign English characters, a compilation warning message will appear, as shown below:

![Screenshot-2020-09-30-at-1.55.50-PM-768x366](//images.contentful.com/uhmar3aa2ux0/46PKwOFb1Q854tlR7mxl5D/f16b5f6079743604b9990f9dd7df3305/Screenshot-2020-09-30-at-1.55.50-PM-768x366.png)

## Logical analysis

Logic analysis of potential logic problems in static analysis code, such as accessing null pointers, uninitialized variables, or initializing zero-length arrays, etc., as shown in the following figures:

– If you try to remove an element from the array arrSample it will crash.

![Screenshot-2020-09-30-at-2.02.44-PM-768x287](//images.contentful.com/uhmar3aa2ux0/1VuF0QcWuLwITUN4cwbg4p/b52c243a4b2920a7a7b48cf76d72acfa/Screenshot-2020-09-30-at-2.02.44-PM-768x287.png)

– Auto-completion will allow here to add an initial value to strLength.

![Screenshot-2020-09-30-at-2.08.26-PM-768x261](//images.contentful.com/uhmar3aa2ux0/3qiXTc3EbfeMESK3etNcwB/38bf94a48de700f2d0ef43bdcc3f62d2/Screenshot-2020-09-30-at-2.08.26-PM-768x261.png)

– __Note:__ A NULL pointer dereference occurs when the application dereferences a pointer that it expects to be valid, but is NULL, typically causing a crash or exit. NULL pointer dereference issues can occur through a number of flaws, including race conditions, and simple programming omissions.

![Screenshot-2020-09-30-at-2.11.25-PM-768x267](//images.contentful.com/uhmar3aa2ux0/rdLoiWFeRUjjFT8grdmaG/c47482a0cd89b4ff4f470ec8f8486f3b/Screenshot-2020-09-30-at-2.11.25-PM-768x267.png)

## Memory analysis

Memory management errors include memory leaks etc.

- core foundation is not included under ARC memory management, you can use __bridge_transfer or CFBridgingRelease to move the ownership of the Core Foundation object to the under the Objective-C ARC object ownership. refer [Medium Article].
- ARC is responsible for relinquishing ownership of the object.

__Note:__

- The compiler does not automatically manage the lifetimes of Core Foundation objects; you must call CFRetain and CFRelease.
- Creating an object to request memory but not using it causes memory leaks.

![Screenshot-2020-09-30-at-2.21.34-PM-768x324](//images.contentful.com/uhmar3aa2ux0/1swESIyYLBkzHWamuTv1VO/cdc5ea4ab50da1beadef9c86063c707c/Screenshot-2020-09-30-at-2.21.34-PM-768x324.png)

## Static Analysis Tools

- [OCLint](https://github.com/oclint/oclint) – OCLint is a static code analysis tool for improving quality and reducing defects by inspecting C, C++, and Objective-C code.
- [SwiftLint](https://github.com/realm/SwiftLint) – A tool to enforce Swift style and conventions.
- [Sonarqube](https://www.sonarqube.org/) – A paid tool that supports more than 15 languages, includes Swift and Objective-C.

__References:__

- [Xcode: The Static Analyzer.](https://developer.apple.com/library/archive/documentation/DeveloperTools/Conceptual/debugging_with_xcode/chapters/static_analyzer.html#:~:text=To%20perform%20static%20code%20analysis,such%20as%20leaking%20allocated%20memory)
- [Memory Analysis](https://developer.apple.com/library/archive/releasenotes/ObjectiveC/RN-TransitioningToARC/Introduction/Introduction.html#//apple_ref/doc/uid/TP40011226-CH1-SW1)
- [__bridge vs __bridge_transfer vs __bridge_retained](https://medium.com/@notestomyself/bridge-vs-bridge-transfer-vs-bridge-retained-f84e6b6406d1)
