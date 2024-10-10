---
title: Protocol oriented programming in Swift 5 - Basics
author: avadhesh
date: 2021-11-21 14:10:00 +0800
categories: [Swift]
tags: [protocol]
render_with_liquid: false
---

> Don’t start with a class, start with a protocol.
> 
> – Apple

## About POP
- Apple introduced the POP concept in Swift 2.0 (WWDC 2015).
- Other programming languages such as Java, PHP use the keyword “interface”.

## What is a Protocol

- A protocol defines the method, property requirements that need to be implemented by conforming types i.e __[Class, Structure and Enum]__.
- The protocol only provides a blueprint for the requirements and It can’t be instantiated.

## POP Approach

- Start defining requirements in a Protocol.
- Advanced features supported by Protocols are:
  - Protocol Inheritance.
  - Protocol Composition.
  - Protocol Extensions.
- Value-type preferred over Reference-type. Use struct, enum, and tuple instead of Class exclusively.

## Protocol Naming

Refer: [Swift API Design Guidelines](https://swift.org/documentation/api-design-guidelines/)
- Protocol Name should be in UpperCamelCase.
- Protocols that describe what something is should read as nouns (e.g. Collection).
- Protocols that describe a capability should be named using the suffixes __able__, __ible__, or __ing__ (e.g. __Equatable__, __ProgressReporting__, __CustomStringConvertible__).

## Protocol Example

```swift
protocol BaseType {
    var objId: String { get set }
}
```
> __Note:__ Property in protocol must have explicit __{ get }__ or __{ get set }__ specifier

## Create a Class-bound Protocol

```swift
protocol BaseType: AnyObject {
    var objectId: String { get set }
}
```

## Conforming to a protocol

```swift
struct Box: BaseType {
    var objectId: String
}
```

> __Tip__: Use auto-completion to add protocol stubs.

## Conforming to protocols via extensions

```swift
struct StudentModel {
    var name: String
    var rollNumber: Int
}

protocol StudentIdentifiable {
    func studentDesc() -> String
}

extension StudentModel: StudentIdentifiable {
    func studentDesc() -> String {
        return "Student name is \(name) and his roll no. is \(rollNumber)"
    }
}
let student1 = StudentModel(name: "Avadhesh", rollNumber: 1)
print(student1.studentDesc())
```

## Polymorphism using protocols
> polymorphism is the provision of a single interface to entities of different types.

```swift
protocol Shape {
    var area: Double { get }
    var perimeter: Double { get }
}

struct Circle: Shape {
    let radius: Double
    var area: Double {
        return .pi * radius * radius
    }
    var perimeter: Double {
        return 2 * .pi * radius
    }
}

struct Rectangle: Shape {
    let width: Double
    let height: Double

    var area: Double {
        return width * height
    }

    var perimeter: Double {
        return 2 * (width + height)
    }
}

struct Square: Shape {
    let lengthOfSide: Double

    var area: Double {
        return lengthOfSide * lengthOfSide
    }

    var perimeter: Double {
        return 4 * lengthOfSide
    }
}

var arrayOfShapes = Array<Shape>()
arrayOfShapes.append(Square(lengthOfSide: 10))
arrayOfShapes.append(Rectangle(width: 30, height: 20))
arrayOfShapes.append(Circle(radius: 10))

for shape in arrayOfShapes {
    print("Shape is \(type(of: shape)) of area \(shape.area) and permimeter \(shape.perimeter)")
}
```

Output:
```
Shape is Square of area 100.0 and permimeter 40.0

Shape is Rectangle of area 600.0 and permimeter 100.0

Shape is Circle of area 314.1592653589793 and permimeter 62.83185307179586
```

## Protocol Inheritance

A protocol can be inherited from one or more protocol and the inherited one can have their own requirements on top of it.

```swift
protocol Identifiable {
    var eventType: String { get }
}

protocol Describing: Identifiable {
    var desc: String { get }
}

protocol EventRecording: Describing {}

struct Event: EventRecording,CustomStringConvertible {
    var eventType: String
    var desc: String

    var description: String {
        return "\(eventType) : \(desc)"
    }
}

let homeEvent = Event(eventType: "HomePage", desc: "Logged In Succesfully!!!")
print(homeEvent)
```

Output:
```
HomePage : Logged In Succesfully!!!
```

## Protocol Composition
Protocol composition lets the type adopt multiple protocols. It allows us to break requirements into multiple protocols instead of inheriting requirements from a single protocol or super-class.

Consider this class hierarchy :

![Protocol-Composition-DFD-768x341](//images.contentful.com/uhmar3aa2ux0/4g6rg2i6dZS24plPhMQ7Id/115f81d8832d1e0aa97b23ddb208fe08/Protocol-Composition-DFD-768x341.png)

__Note:__ Flowchart created with [Creately](https://creately.com/)

With Protocol composition, we can have our requirements specified under protocols for Employee, Senior, and Junior. This approach allows us to only adopt to the requirement we desire.

```swift
struct JuniorJavaDeveloper: EmployeeProtocol, JuniorProtocol { } 
```
