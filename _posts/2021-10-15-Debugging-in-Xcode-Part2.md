---
title: Debugging in Xcode Basics (Part 2)
author: avadhesh
date: 2021-10-15 14:10:00 +0800
categories: [Swift]
tags: [debugging]
render_with_liquid: false
---

## Symbolic Breakpoint

![Screenshot-2020-09-16-at-2.43.20-PM](//images.contentful.com/uhmar3aa2ux0/3kYIqKiWHmAd9EGk5fscus/12fd8bfdd5031eaa936e08473875d31f/Screenshot-2020-09-16-at-2.43.20-PM.png)

To create a symbolic breakpoint in Xcode, click the + button in the lower-left toolbar within the Breakpoint Navigator and choose “Symbolic Breakpoint…”.

![Screenshot-2020-09-16-at-2.44.38-PM-768x338](//images.contentful.com/uhmar3aa2ux0/35cqQ6cVeXMJGCgvzfjQjx/b39b8cf0fa29029b8a4cce88fc5da63e/Screenshot-2020-09-16-at-2.44.38-PM-768x338.png)

In the above screenshot, you can see that I’m adding a symbolic breakpoint for the method `getDetails()` and added a debugger command `bt` (Backtrace of thread can be useful when debugging multithreaded part of the application).

If you run the app with the breakpoint enabled it will pause every time the `getDetails()` method is called. The breakpoint will be automatically added if the same method signature is in some other class as well. (see the below screenshot)

![Screenshot-2020-09-16-at-8.41.33-PM-768x338](//images.contentful.com/uhmar3aa2ux0/28I9sj4pZbSuGWheTup67W/c11c91a8f80a7289dd3555f4effc6f88/Screenshot-2020-09-16-at-8.41.33-PM-768x338.png)

## Conditioning breakpoints

To create a conditioning breakpoint, you just set the breakpoint like you normally do. Next, you edit that breakpoint, which will give you the interface to add a condition. Here for the demo, I’ve added a breakpoint inside a loop and added a condition that allows the breakpoint to keep skipping until it meets the condition, the one you want to debug. In the below screenshot you can see that once the condition i.e `[selectedFruit == “pineapple”]` satisfies it stopped.

![Screenshot-2020-09-16-at-9.00.03-PM-768x477](//images.contentful.com/uhmar3aa2ux0/1j7RhfkafQW4i0jxRJeOC4/4667023b9d4707fececf51383936f0c2/Screenshot-2020-09-16-at-9.00.03-PM-768x477.png)

## Customizing breakpoints

You can customize actions on the breakpoints. Multiple actions can be added to a breakpoint(check the below screenshot for reference)

![Screenshot-2020-09-16-at-9.49.15-PM](//images.contentful.com/uhmar3aa2ux0/6xUTClxqXIOH8klMzrhZsH/a6baef7bb804becf54149987dac89ece/Screenshot-2020-09-16-at-9.49.15-PM.png)

For the demo, I’ve added a breakpoint to the ‘deinit‘ method that plays a sound and debug-info of bt command whenever the ‘Viewcontroller’ gets deallocated.

![Screenshot-2020-09-16-at-9.47.39-PM-768x448](//images.contentful.com/uhmar3aa2ux0/1j52qHApYVpHozWt2zqd2f/48b3e491c9e60060af7b64272ec28d5c/Screenshot-2020-09-16-at-9.47.39-PM-768x448.png)

## Setting up Watch Breakpoint

__Watchpoint:__  A watchpoint can be added by right-clicking on a variable in variables view So that it stops execution whenever the value changes. (Also called as data breakpoint).

![Screenshot-2020-09-27-at-1.23.02-PM-768x412](//images.contentful.com/uhmar3aa2ux0/65c2x7NMjn2XKnb1jsTuPZ/4dee1c4d3ab244f520e1d6c7ab91c568/Screenshot-2020-09-27-at-1.23.02-PM-768x412.png)

In the above screenshot, you can see I’ve added a watchpoint to the “arrFruits” variable. The moment I tried to append something to that array it stopped the execution and in the call stack, it shows why it happened.

![Screenshot-2020-09-27-at-1.27.02-PM-768x459](//images.contentful.com/uhmar3aa2ux0/7KKUsKpb004a6XCxu2KSz2/4b1acd6f0ed514ec1b582d84e04ba83a/Screenshot-2020-09-27-at-1.27.02-PM-768x459.png)

Watchpoint can be created through lldb commands too.

![Screenshot-2020-09-27-at-2.11.20-PM-768x459](//images.contentful.com/uhmar3aa2ux0/2DWO32yeBwDL99AY7cDjqB/c2e99048c74c8ad0f74063c1be9ae302/Screenshot-2020-09-27-at-2.11.20-PM-768x459.png)

> There are limited hardware resources for watchpoints. If the watchpoint setting fails, consider disabling/delete existing ones to free up resources.
{: .prompt-info }

### References:
[GDB to LLDB command map](https://lldb.llvm.org/use/map.html#)
