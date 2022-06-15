# functional-programming-javascript

Goals:

1. Learn about functional programming (Functor, Monoids, Pure, ...)
2. Learn how functional programming solved things like 
    - 2.1 Creating a layer architecture - Module A depend on Module B and Module B depend on Module C, Module A should have acces what's inside of Module C
    - 2.2 Decoupling of implementation and the defintion, Like in OOP are interfaces are used.
    - 2.3 validations across aggregates in a way without to mutch overhead ( like a seperate Domain and ORM model + mappers )
    - 2.4 updating deeply nested types ( Lenses ? )
    - 2.5 Creating abstraction
3. Understand if javascript is easier to write in a functional or a OOP way - easier refers to less overhead


Answers:

How to do:

Encapsulation: Module pattern - Each function you expose outside of the module you can see as a public method,
                                 the rest are privates because only the funcions inside of the module can reach them.

Classes: Factories and closure - When exposing a functions with functions and variabels, through the closjure scope every function inside the top function                                     can reach these "private" variabels. You really have a stated functions. Can we created a forced constructor
                                    inside this ?
