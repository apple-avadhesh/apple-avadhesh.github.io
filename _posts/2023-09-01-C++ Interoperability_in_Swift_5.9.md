---
title: What's new in C++ Interoperability in Swift 5.9
author: avadhesh
date: 2023-09-01 14:10:00 +0800
categories: [Swift]
tags: [Swift 5.9]
render_with_liquid: false
---

## Introduction

- For some types of APIs, Swift 5.9 provides bidirectional compatibility with C++ and Objective-C++.
- Swift 5.9 introduced direct interoperability between Swift and C++ types and functions.

## Implementation
### Configuration 
__Step 1:__ <kbd>Build Settings</kbd> > <kbd>Swift Complier - Language</kbd> > <kbd>C++ and Objective-C Interoperability</kbd> > <kbd>Select C++/Objective-C++</kbd>

![Interoperability](https://images.ctfassets.net/uhmar3aa2ux0/4zRVvSkhm2vhdyipAbR9QM/8583210074724a9197ed0dd85d52f301/Screenshot_2023-10-01_at_10.28.50_AM.png)

![InteroperabilityDropDown](https://images.ctfassets.net/uhmar3aa2ux0/18aYAmf5ODEryEPpxh37WY/31ca2099c5b1b7c6fa07d346430da26e/Screenshot_2023-10-01_at_10.29.11_AM.png)

__Step 2:__ Import C++ file i.e [Employee.cpp] into the Bridging Header 

```swift
#import "Employee.cpp"
```

### Calling C++ in Swift
In this example, you define a structure called Employee with two parameters: name of type std::string and age of type int. The initializer is defined using a constructor that takes the name and age as parameters and initializes the corresponding member variables.

```c++
#include <iostream>
#include <string>

struct Employee {
    std::string name;
    int age;

    // Initializer
    Employee(const std::string& empName, int empAge) : name(empName), age(empAge) {}
};
```

And in Swift file create an instance of Employee named emp using the initializer by passing the name "Jacob" and age 30 as arguments. You then access and print the employee's name and age using the emp.name and emp.age member variables, respectively.

```swift
func createEmployee() {
    let emp = Employee("Jacob", 30)
    print(emp.name)
    print(emp.age)
}
```

## References
- https://www.swift.org/blog/swift-5.9-released/
- https://forums.swift.org/t/c-interoperability-in-swift-5-9/65369


