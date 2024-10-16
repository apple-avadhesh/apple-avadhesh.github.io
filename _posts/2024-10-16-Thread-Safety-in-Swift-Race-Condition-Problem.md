---
title: Thread Safety in Swift - Race Condition Problem
author: avadhesh
date: 2024-10-16 14:10:00 +0800
categories: [Swift]
tags: [concurrency]
render_with_liquid: false
---

Concurrency in Swift is a powerful tool, allowing us to write efficient and responsive applications. However, it also brings with it the responsibility of ensuring thread safety. Let's delve into a common concurrency pitfall, using a practical example with `DispatchQueue` and `DispatchGroup`.

### Scenario:
The following code, designed to increment a shared resource using a DispatchGroup and concurrent threads:

```swift
func testThreadSafety() {
    let group = DispatchGroup()
    var sharedResource = 0

    for _ in 1...1000 {
        group.enter()
        DispatchQueue.global().async {
            sharedResource += 1
            group.leave()
        }
    }

    group.notify(queue: .main) {
        print("Final value: \(sharedResource)")
    }
}
```

The intent is clear: increment sharedResource 1000 times concurrently and then print the final result. However, this code harbors a subtle but significant issue: a race condition.

### Dissecting the Race Condition
The `sharedResource += 1` operation, while seemingly simple, is not atomic. It involves these steps:
Read: The current value of sharedResource is read from memory.\
Increment: The value is incremented.\
Write: The updated value is written back to memory.\
When multiple threads execute this non-atomic operation concurrently, they can interfere with each other. For example:\

Thread A reads sharedResource as 10.\
Thread B reads sharedResource also as 10.\
Thread A increments to 11 and writes back.\
Thread B increments to 11 and writes back.\
The result? We've lost an increment! The final value of sharedResource might be significantly less than 1000.\

### Restoring Order with Synchronization
To prevent this race condition, we need to synchronize access to sharedResource. Here are some solutions, adapted to the example code:

#### 1. DispatchQueue with sync
Create a serial queue and perform the increment operation synchronously within it. By performing the increment operation synchronously on a serial `DispatchQueue`, we ensure that only one thread can access the counter at a time.
```swift
func testThreadSafety() {
  let group = DispatchGroup()
  let queue = DispatchQueue(label: "com.yourApp.serialQueue")
  var sharedResource = 0

  for _ in 1...1000 {
      group.enter()
      DispatchQueue.global().async {
          queue.sync {
              sharedResource += 1
          }
          group.leave()
      }
  }

  group.notify(queue: .main) {
    print("Final value: \(sharedResource)")
  }
}
```

#### 2. DispatchSemaphore
Use a semaphore to restrict access to `sharedResource` to one thread at a time. A semaphore acts as a gatekeeper, limiting the number of concurrent accesses to a shared resource.
```swift
func testThreadSafety() {
  let group = DispatchGroup()
  var sharedResource = 0
  let semaphore = DispatchSemaphore(value: 1)

  for _ in 1...1000 {
    group.enter()
    DispatchQueue.global().async {
      semaphore.wait()
      sharedResource += 1
      semaphore.signal()
      group.leave()
    }
  }

  group.notify(queue: .main) {
    print("Final value: \(sharedResource)")
  }
}
```

#### 3. Actors
Encapsulate `sharedResource` within an actor to ensure thread-safe access. Introduced in Swift 5.5, actors encapsulate data and provide a safe way to access and modify it from multiple threads.
```swift
func testThreadSafety() {
  let group = DispatchGroup()

  actor Counter {
    private var sharedResource = 0
    func increment() { sharedResource += 1 }
    func getValue() -> Int { return sharedResource }
  }

  let counter = Counter()

  for _ in 1...1000 {
    group.enter()
    DispatchQueue.global().async {
      Task {
        await counter.increment()
        group.leave()
      }
    }
  }

  group.notify(queue: .main) {
    Task {
      let finalValue = await counter.getValue()
      print("Final value: \(finalValue)")
    }
  }
}
```

Explanation:
Task to the Rescue: By wrapping await counter.increment() inside a Task, you create a new asynchronous context within the DispatchQueue closure. This allows you to use await to call the actor's increment() method.

> When using actors with DispatchGroup, make sure you call group.leave()  inside the Task to ensure that the group waits for the asynchronous actor method to complete.
With this adjustment, your code should compile and run correctly, demonstrating the thread-safe incrementing of the sharedResource using an actor.