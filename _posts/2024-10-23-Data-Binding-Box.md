---
title: Use closures to implement data binding
author: avadhesh
date: 2024-10-23 14:10:00 +0800
categories: [Swift, MVVM]
tags: [binding]
render_with_liquid: false
---

In Swift, observing changes to variables is crucial for building responsive and dynamic applications. While property observers like didSet are useful, they can sometimes be limiting. The Box class provides a more flexible approach to observing value changes.

### The Observer Pattern
The Box class implements a simplified version of the observer pattern. This design pattern promotes loose coupling between objects by allowing one object (the "subject" or "observable") to notify other objects (the "observers") about changes in its state.

```swift
final class Box<T> {
    // Typealias to simplify the closure signature
    typealias Listener = (T) -> Void
    
    // Optional closure to listen for changes
    var listener: Listener?
    
    // Property with observer. Calls listener whenever its value changes.
    var value: T {
        didSet {
            listener?(value)
        }
    }
    
    // Initializer to set the initial value
    init(_ value: T) {
        self.value = value
    }
    
    // Binds a listener to the value, and immediately triggers it with the current value
    func bind(listener: Listener?) {
        self.listener = listener
        listener?(value)
    }
}
```

### Example Usage

```swift
class ViewModel {
    let name = Box("Initial Name")

    init() {
        // Simulate changing the name after 3 seconds
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) {
            self.name.value = "New Name"
        }
    }
}

let viewModel = ViewModel()

viewModel.name.bind { newName in
    print("Name changed to: \(newName)")
}
```

In this example, the **ViewModel** has a name property that's an instance of the **Box** class. After 3 seconds, the **name.value** is updated. This triggers the bind closure, and "Name changed to: New Name" is printed to the console.
