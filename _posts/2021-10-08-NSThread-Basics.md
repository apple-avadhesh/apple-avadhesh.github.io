---
title: NSThread Basics
author: avadhesh
date: 2021-11-10 14:10:00 +0800
categories: [Swift]
tags: [NSThread]
render_with_liquid: false
---

## About

NSthread class is the most basic and lightweight multi-threading technology used for multithreading in iOS which can be used to directly manipulate thread objects.

__References:__ [Apple Doc](https://developer.apple.com/documentation/foundation/nsthread)

## Create a Thread

```swift
func testThread(){
    let thread1 = Thread.init(target: self, selector: #selector(loopMethod), object: nil)
    thread1.name = "Thread 1"
    thread1.start()
}

@objc func loopMethod(){
    for i in 0...100 {
        print("Index \(i)")
    }
}
```

```swift
func testThreadUsingBlock() {
    let thread2 = Thread.init {
        for i in 0...100 {
            print("Index \(i)")
        }
    }

    thread2.name = "Thread 2"
    thread2.start()
}
```

__Start__ the thread internally calls the main method.
The default __main__ method automatically calls the selector.
If you customize the __Thread__ subclass, you can override this method and implement the tasks in it.
Do not call the main method directly. Always start the thread by calling __start__ method.

```swift
class ASThread: Thread {
    override func main() {
        print(ASThread.current.name ?? "")
    }
}
```

```swift
func testSubclassedThread() {
    let thread = ASThread.init()
    thread.name = "Custom Thread"
    thread.start()
}
```

## Stop/block thread

```swift
open class func sleep(until date: Date)
```

Block the current thread until the specified time. When the thread is blocked, no running loop processing occurs.

```swift
open class func sleep(forTimeInterval ti: TimeInterval)
```

Block the current thread until the specified time interval. When the thread is blocked, no running loop processing occurs.

```swift
open class func exit()
```

Terminate the current thread.

```swift
open func cancel()
```

Stop performing the current task. Set the thread to the canceled state.

## Thread priority

`open var threadPriority: Double`

The priority of the thread is specified by a floating-point number between 0.0 and 1.0, where 1.0 is the highest priority. The default is 0.5. A thread with a higher priority is more likely to be scheduled by the CPU.

```swift
open class func setThreadPriority(_ p: Double) -> Bool
```

Set the priority of the current thread. If the priority setting is successful, return True, otherwise, return False.

```swift
open var qualityOfService: QualityOfService
```

__QualityOfService:__

`QualityOfService.userInteractive`: The highest priority, mainly used to provide interactive UI operations, such as handling click events and drawing images to the screen

`QualityOfService.userInitiated`: The second highest priority, mainly used to execute tasks that need to return immediately

`QualityOfService.default`: The default priority, when the priority is not set, the thread default priority

`QualityOfService.utility`: Normal priority, mainly used for tasks that do not need to return immediately

`QualityOfService.background`: Background priority, used for tasks that are not urgent at all

## Thread Environment Attributes

```swift
open class func isMultiThreaded() -> Bool
```

Returns whether the application is multi-threaded.

```swift
open class var current: Thread { get }
```

Get the currently executing thread object.

```swift
open class var isMainThread: Bool { get }
```

A Boolean value to determine whether the current thread is the main thread. If it is the main thread, return True, otherwise return False.

```swift
open class var main: Thread { get }
```

Get the main thread object.

## Thread execution states

```swift
open var isExecuting: Bool { get }
```

A Boolean value to determine whether the thread is executing. If the thread is executing, return True, otherwise, return False.

```swift
open var isFinished: Bool { get }
```

A Boolean value that determines whether the thread has completed execution. If the thread has finished executing, return True, otherwise, return False.

```swift
open var isCancelled: Bool { get }
```

A Boolean value that determines whether the thread is canceled. If the thread is canceled, return True, otherwise, return False. Calling cancel methods of the object can set the value of this property to true. If the thread supports cancellation, it should check this attribute periodically (in the main method), and exit if it returns true.
