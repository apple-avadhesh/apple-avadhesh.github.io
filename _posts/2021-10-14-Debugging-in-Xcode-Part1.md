---
title: Debugging in Xcode Basics (Part 1)
author: avadhesh
date: 2021-10-14 14:10:00 +0800
categories: [Swift]
tags: [debugging]
render_with_liquid: false
---

## Print Statement

You can print any object in the debug area using the print function.

![Screenshot-2020-09-15-at-4.21.14-PM-768x597](https://images.contentful.com/uhmar3aa2ux0/3P5GNvLrPPtODYQ9cttaQC/e6d30e94d49dd7fab4495b6afc37947a/Screenshot-2020-09-15-at-4.21.14-PM-768x597.png)

## Literal expressions can be added too in the print function

| Literal     | Type     | Value     |
| ---------- | ---------- | ---------- |
| #file	       | String       | The name of the file and module in which it appears.|
| #filePath	       | String       | The path to the file in which it appears.|
| #line	       | Int       | The line number on which it appears.|
| #column	       | Int       | The column number in which it begins.|
| #function	       | String       | The name of the declaration in which it appears.|
| #dsohandle	       | UnsafeRawPointer	       | The DSO (dynamic shared object) handles in use where it appears. |

__Source__: [https://docs.swift.org/swift-book/ReferenceManual/Expressions.html](https://docs.swift.org/swift-book/ReferenceManual/Expressions.html)

![Screenshot-2020-09-15-at-6.14.20-PM-768x590](https://images.contentful.com/uhmar3aa2ux0/5NjYxU5Wv09w9MrmY1V4fY/001cdf511fc0ae7d6e9e49fd92de5c50/Screenshot-2020-09-15-at-6.14.20-PM-768x590.png)

## Buildtime Swift Compiler Warnings

![Screenshot-2020-09-15-at-6.40.20-PM-768x461](https://images.contentful.com/uhmar3aa2ux0/18uKp2yR2ftashUU6Jo7o7/8b6fdd54f2fb919224d7ddde062a96b3/Screenshot-2020-09-15-at-6.40.20-PM-768x461.png)

In the above screenshot, you can see the build time warning that can be resolved by adding __@discardableResult__ in the function or you can treat as a warning too. (see below screenshot)

![Screenshot-2020-09-15-at-8.22.24-PM-1-768x461](https://images.contentful.com/uhmar3aa2ux0/20tge8DIQrww08F4nKtVlB/9672096f34c96fa833be0b4d3357b147/Screenshot-2020-09-15-at-8.22.24-PM-1-768x461.png)

## Runtime Swift Compiler Issues

Xcode Runtime Issues are reports of programming errors found at run time. Issues can be found by a variety of tools, including Address Sanitizer (ASan), Main Thread Checker (MTC), Thread Sanitizer (TSan), and Undefined Behavior Sanitizer (UBSan).

Source: [Apple Doc](https://developer.apple.com/documentation/xcode/diagnosing_memory_thread_and_crash_issues_early) 

![Screenshot-2020-09-15-at-9.06.29-PM-768x461](https://images.contentful.com/uhmar3aa2ux0/7DIVIIHrHGmGPmqlmcb192/8f6446605fd2cd55d3f4991084f7988f/Screenshot-2020-09-15-at-9.06.29-PM-768x461.png)

## Debugging In Xcode With LLDB

Now we can see how the current thread’s call stack looks when we forced a crash. (see screenshot)

![Screenshot-2020-09-16-at-1.48.54-PM-768x453](https://images.contentful.com/uhmar3aa2ux0/UvNgJHDO7JtG0N4rM0p3r/f8681f47eef27789ba7590e73426edd3/Screenshot-2020-09-16-at-1.48.54-PM-768x453.png)

We can also check the stop-reason by running the “thread info” command in the debug area.

![Screenshot-2020-09-16-at-1.55.04-PM-768x322](https://images.contentful.com/uhmar3aa2ux0/4Dr63mstMjoiO5w0gvwV7B/1ed6703e405c2431ddb6c8ce5358f037/Screenshot-2020-09-16-at-1.55.04-PM-768x322.png)

During a debugging session, we can check the call stack in the debug area too by running the command “bt“(backtrace). For more debugger commands type “help” in the debug area.

![Screenshot-2020-09-16-at-1.58.19-PM-768x460](https://images.contentful.com/uhmar3aa2ux0/3O7BYOnor1lCxy128Pzx6m/f4bb0366ddcbd65f6bf4853b265c9167/Screenshot-2020-09-16-at-1.58.19-PM-768x460.png)
