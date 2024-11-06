---
title: Comparing the use cases of async and sync on both serial and concurrent queues
author: avadhesh
date: 2024-11-05 14:10:00 +0800
categories: [Swift]
tags: [concurrency]
render_with_liquid: false
---

| Queue Type | Method | Description | When to Use | Example Scenario |
|---|---|---|---|---|
| Serial Queue | sync | Executes the block synchronously, blocking the current thread until the block finishes. | When you need to ensure a specific order of execution and don't mind blocking the current thread. | Updating a shared resource like a database or file system. |
| Serial Queue | async | Executes the block asynchronously, returning immediately without blocking the current thread. | When you need to perform I/O-bound tasks without blocking the main thread. | Fetching data from a network or reading/writing a file. |
| Concurrent Queue | sync | Executes the block synchronously, blocking the current thread until all tasks on the queue finish. | When you need to ensure a specific order of execution for concurrent tasks and don't mind blocking the current thread. | Not recommended for most use cases as it can lead to deadlocks. |
| Concurrent Queue | async | Executes the block asynchronously, allowing multiple tasks to run concurrently. | When you need to maximize performance by executing multiple tasks concurrently without blocking the current thread. | Processing multiple images or performing multiple network requests. |

### I've chosen the colors based on the following logic:
1. Red (🔴): For tasks that are potentially blocking or have a sequential nature.
2. Blue (🔵): For asynchronous tasks that don't block the main thread.
3. Green (🟢): For tasks that are potentially blocking, especially when used with sync on a concurrent queue.
4. Yellow (🟡): For tasks that are truly concurrent and non-blocking.
5. This color-coding helps visualize the flow of execution and potential performance implications.

## Serial Queue + Sync

 - Executes tasks one by one.
 - Blocks the current thread until the task finishes.
 - Ensures specific order of execution.
 - Ideal for simple sequential tasks.

```swift
let serialQueue = DispatchQueue(label: "serialQueue")

serialQueue.sync {
    print("🔴 Task 1 started on serialQueue")
    // Task 1: Some work
    print("🔴 Task 1 finished on serialQueue")
}

serialQueue.sync {
    print("🔴 Task 2 started on serialQueue")
    // Task 2: Some more work
    print("🔴 Task 2 finished on serialQueue")
}
```
#### Output:
```console
🔴 Task 1 started on serialQueue
🔴 Task 1 finished on serialQueue
🔴 Task 2 started on serialQueue
🔴 Task 2 finished on serialQueue
```

## Serial Queue + Async

 - Executes tasks one by one.
 - Does not block the current thread.
 - Suitable for I/O-bound tasks.
 - Prevents blocking the main thread.

```swift
let serialQueue = DispatchQueue(label: "serialQueue")

serialQueue.async {
    print("🔵 Task 3 started on serialQueue")
    // Task 3: I/O-bound task (e.g., network request)
    print("🔵 Task 3 finished on serialQueue")
}
```
#### Output:
```console
🔵 Task 3 started on serialQueue
🔵 Task 3 finished on serialQueue
```

## Concurrent Queue + Sync (Not Recommended)

 - Executes tasks concurrently.
 - Blocks the current thread until all tasks finish.
 - Not recommended due to potential deadlocks.
 - Can be used for specific scenarios where strict ordering is required.

```swift
let concurrentQueue = DispatchQueue(label: "concurrentQueue", attributes: .concurrent)

concurrentQueue.sync {
    print("🟢 Task 4 started on concurrentQueue")
    // Task 4: Heavy computation
    print("🟢 Task 4 finished on concurrentQueue")
}

concurrentQueue.sync {
    print("🟢 Task 5 started on concurrentQueue")
    // Task 5: Another heavy computation
    print("🟢 Task 5 finished on concurrentQueue")
}
```
#### Output:
```console
🟢 Task 4 started on concurrentQueue
🟢 Task 4 finished on concurrentQueue
🟢 Task 5 started on concurrentQueue
🟢 Task 5 finished on concurrentQueue
```

## Concurrent Queue + Async

 - Executes tasks concurrently.
 - Does not block the current thread.
 - Ideal for CPU-bound tasks.
 - Maximizes performance by utilizing multiple cores.

```swift
let concurrentQueue = DispatchQueue(label: "concurrentQueue", attributes: .concurrent)

concurrentQueue.async {
    print("🟡 Task 6 started on concurrentQueue")
    // Task 6: Image processing
    print("🟡 Task 6 finished on concurrentQueue")
}

concurrentQueue.async {
    print("🟡 Task 7 started on concurrentQueue")
    // Task 7: Another image processing task
    print("🟡 Task 7 finished on concurrentQueue")
}
```
#### Output: 

> The order of execution for tasks on a concurrent queue is not guaranteed. The operating system's scheduler will determine the actual order based on various factors like thread availability, system load, and task priority.
{: .prompt-tip }

```console

Here's a possible output:
🟡 Task 6 started on concurrentQueue
🟡 Task 7 started on concurrentQueue
🟡 Task 7 finished on concurrentQueue
🟡 Task 6 finished on concurrentQueue

Or it could be:
🟡 Task 7 started on concurrentQueue
🟡 Task 6 started on concurrentQueue
🟡 Task 7 finished on concurrentQueue
🟡 Task 6 finished on concurrentQueue

Or even something more interleaved:
🟡 Task 6 started on concurrentQueue
🟡 Task 7 started on concurrentQueue
🟡 Task 6 finished on concurrentQueue
🟡 Task 7 finished on concurrentQueue
```
