---
title: Detect Keystrokes globally (macOS Keystroke logging)
author: avadhesh
date: 2022-02-10 14:10:00 +0800
categories: [macOS]
tags: [keystroke logging]
render_with_liquid: false
---

## Envirnoment:
__macOS__: 12.2 Beta 
__Xcode__: 13.2.1

## Prerequisites:

> Excerpt from __Charles Srstka__ answer on Stackover Flow : [Link](https://stackoverflow.com/a/45994269/6576315)
> 
> 1) Your app needs to be code-signed.
> 
> 2) Your app needs to not have the App Sandbox enabled, and:
> 
> 3) Your app needs to be registered in the Security and Privacy preference pane, under Accessibility.

## Prompt for user's permission:  

![AccessibilityAccessPrompt](//images.ctfassets.net/uhmar3aa2ux0/266xmQUFLBqlW5wGJrZwcX/16dbcb0be9cd0bc7fe2a7d934edfa1ce/Screenshot_2022-02-14_at_10.03.51_AM.png)

```swift
@discardableResult
func acquirePrivileges() -> Bool {
    let accessEnabled = AXIsProcessTrustedWithOptions([kAXTrustedCheckOptionPrompt.takeUnretainedValue() as String: true] as CFDictionary)

    if accessEnabled != true {
        print("You need to enable the keylogger in the System Prefrences")
    }
    return accessEnabled
}
```

> The above code will present the alert for permission, navigate to Privacy tab under __System Preferences__ > __Security & Privacy__ and clicking on the App's checkbox should enable accessibility for the app.
{: .prompt-info }

![AccessibilityPermissionAllowed](//images.ctfassets.net/uhmar3aa2ux0/2UYUrqzDtgISSGvO5Sazh1/1460a083d064c35f3926e89ebbad6774/Screenshot_2022-02-14_at_10.07.33_AM.png)

Using the below code will allow adding global monitoring for the __*.keyDown*__ event. The event will not be triggered if you try to enter a password on any website. [Now aware of any public API or workaround to tackle that for now 😉] 

```swift
@main
class AppDelegate: NSObject, NSApplicationDelegate {

    private var monitor: Any?

    func applicationDidFinishLaunching(_ aNotification: Notification) {

        acquirePrivileges()
        monitor = NSEvent.addGlobalMonitorForEvents(matching: .keyDown) { event in
            print(event)
        }
    }

    func applicationWillTerminate(_ aNotification: Notification) {
        // Insert code here to tear down your application
    }

    func applicationSupportsSecureRestorableState(_ app: NSApplication) -> Bool {
        return true
    }
}
```
