---
title: Local Network in iOS 14
author: avadhesh
date: 2021-10-08 14:10:00 +0800
categories: [Swift]
tags: [local network]
render_with_liquid: false
---

> In iOS14 if your app wants to use Bonjour service, mDNS service, or access a local network then the “Local Network” permission is required.
{: .prompt-tip }

The below image shows services that require authorization. ([WWDC Video](https://developer.apple.com/videos/play/wwdc2020/10110/)).

![Screenshot-2020-11-22-at-10.31.52-PM-768x330](//images.contentful.com/uhmar3aa2ux0/6pKOy9RRAtPJHm1kRIWYAN/c6aeadbc1cedc0864d4c0068cceca816/Screenshot-2020-11-22-at-10.31.52-PM-768x330.png)

Those apps requiring the permission need to describe which services it uses and its purpose in the “Info.plist”.

![Screenshot-2020-11-22-at-11.18.56-PM-768x366](//images.contentful.com/uhmar3aa2ux0/49IO5Qa5jQT02MHsiopYiB/d8576711c314025716aa8678946893c1/Screenshot-2020-11-22-at-11.18.56-PM-768x366.png)

Apps that requested local network permission will be listed under __Settings > Privacy > Local Network__.

![image1-281x500](//images.contentful.com/uhmar3aa2ux0/13W1UMyK8gcv44lOAlpbcB/05bab73491d22802a3a23b5324cf60da/image1-281x500.png)

- If you revoke the permission of any app, manual triggering for request won’t allow the popup to appear.
- The triggered popup appears only at the app’s first launch.
- To consistently reshow the Local Network permission in the app without uninstalling it first, by going to Settings App -> General -> Reset -> Reset Location & Privacy.

### Swift Source Code for Triggering the Local Network Privacy Alert

```swift
func triggerLocalNetworkPrivacyAlert() {
    let sock4 = socket(AF_INET, SOCK_DGRAM, 0)
    guard sock4 >= 0 else { return }
    defer { close(sock4) }
    let sock6 = socket(AF_INET6, SOCK_DGRAM, 0)
    guard sock6 >= 0 else { return }
    defer { close(sock6) }
    let addresses = addressesOfDiscardServiceOnBroadcastCapableInterfaces()
    var message = [UInt8]("!".utf8)
    for address in addresses {
        address.withUnsafeBytes { buf in
            let sa = buf.baseAddress!.assumingMemoryBound(to: sockaddr.self)
            let saLen = socklen_t(buf.count)
            let sock = sa.pointee.sa_family == AF_INET ? sock4 : sock6
            _ = sendto(sock, &message, message.count, MSG_DONTWAIT, sa, saLen)
        }
    }
}

/// Returns the addresses of the discard service (port 9) on every
/// broadcast-capable interface.
///
/// Each array entry is contains either a `sockaddr_in` or `sockaddr_in6`.

private func addressesOfDiscardServiceOnBroadcastCapableInterfaces() -> [Data] {
    var addrList: UnsafeMutablePointer<ifaddrs>? = nil
    let err = getifaddrs(&addrList)
    guard err == 0, let start = addrList else { return [] }
    defer { freeifaddrs(start) }
    return sequence(first: start, next: { $0.pointee.ifa_next })
        .compactMap { i -> Data? in
            guard
                (i.pointee.ifa_flags & UInt32(bitPattern: IFF_BROADCAST)) != 0,
                let sa = i.pointee.ifa_addr
            else { return nil }
            var result = Data(UnsafeRawBufferPointer(start: sa, count: Int(sa.pointee.sa_len)))
            switch CInt(sa.pointee.sa_family) {
            case AF_INET:
                result.withUnsafeMutableBytes { buf in
                    let sin = buf.baseAddress!.assumingMemoryBound(to: sockaddr_in.self)
                    sin.pointee.sin_port = UInt16(9).bigEndian
                }
            case AF_INET6:
                result.withUnsafeMutableBytes { buf in
                    let sin6 = buf.baseAddress!.assumingMemoryBound(to: sockaddr_in6.self)
                    sin6.pointee.sin6_port = UInt16(9).bigEndian
                }

            default:
                return nil
            }
            return result
        }
}
```

You can use the [unsatisfied reason property](https://developer.apple.com/documentation/network/nwpath/3687008-unsatisfiedreason) starting with iOS 14.2.

> Source code below will cause a crash in lower versions.
{: .prompt-warning }

```swift
func checkUnsatisfiedReason() {
    let connection = NWConnection(host: "192.168.7.1", port: 80, using: .tcp)
    connection.stateUpdateHandler = { latestState in
        switch latestState {
        case .setup:
            print("setup")
        case .waiting(_):
            print("waiting")
            if case .localNetworkDenied? = connection.currentPath?.unsatisfiedReason {
                print("Local Network Denied")
            }
        case .preparing:
            print("preparing")
        case .ready:
            print("Local Network Permission Granted")
        case .failed(_):
            print("failed")
        case .cancelled:
            print("cancelled")
        @unknown default:
            fatalError()
        }
    }
    connection.start(queue: DispatchQueue(label: "monitor"))
}
```

An NWPath unsatisfiedReason may indicate a reason the path is unsatisfied. [Apple Documentation]

```swift
/// No reason is given
case notAvailable

/// The user has disabled cellular
case cellularDenied

/// The user has disabled Wi-Fi
case wifiDenied

/// The user has disabled local network access
case localNetworkDenied
```

### References:

[https://developer.apple.com/forums/thread/663858](https://developer.apple.com/forums/thread/663858) 

