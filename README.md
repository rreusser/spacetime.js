**Update: I didn't feel good about this library because it didn't have a good foundation. My initial inclination was to roll a bunch of stuff up into one library. After doing my homework, it's clear that a modular approach is wayyyyy better. [scijs](http://scijs.net/packages/) has a good foundation. I'll almost certainly be putting all further effort there!**

# spacetime.js

spacetime.js is just a few days old, but it represents an ambitious attempt to bring an extended set of basic math capabilities to JavaScript. The truth is that I want to do in JavaScript the sort of engineering/physics calculations that I've previously done in Python/MATLAB, and I'm unable to find a library that covers enough of the basics that it doesn't just make more sense to write it myself. JavaScript is never going to be a strong computing language, but at least until Emscripten and its ilk are better established and serious math libraries are ported, it's what we have.

It's thoroughly tested but lacks documentation at the moment (forthcoming once the API solidifies a bit). Its feature set will hopefully grow quickly.

## Modules

- **Complex**: Represents a single complex number. Since JavaScript doesn't support operator overloading, this includes both in-place and non-in-place operations. Includes different representations as well as powers, exponentials, trig functions and hyperbolic trig functions of complex variables.
- **Derivation**: Calculates first and second numerical derivatives using finite difference approximation.
- **Integration**: Integrate functions of a single variable. Integrators include: Trapezoidal, Simpson's Rule, Euler's Method, (Second Order Runge-Kutta (RK-2), and Fourth Order Runge-Kutta (RK-4) (Euler and RK methods via ODE integrator)
- **ODE**: Integrate a system of ordinary differential equations. Includes Euler's, RK-2 and RK-4 integrators.
- **Path Integration**: Integrate path integrals in the complex plane.
- **Polynomial** (_Incomplete_): Represent polynomials with real or complex coefficients.
- **CVector**: A wrapper for typed arrays that implements complex algebraic operations on vectors.
- **RVector**: A wrapper for typed arrays that implements vector algebra.

## To Do

At the top of my list, in order:

- Figure out if it just makes more sense to fork and collaborate on an existing JS math library.
- Organizational cleanup
- Implement the [Jenkins-Traub root-finding algorithm](http://en.wikipedia.org/wiki/Jenkins%E2%80%93Traub_algorithm) to calculate complex polynomial roots.
- Implement the [Delves-Lyness method](http://www.ams.org/journals/mcom/1967-21-100/S0025-5718-1967-0228165-4/) to directly calculate the roots of a complex transcendental equation. It works like this: You use path integrals to encircle roots. Then you calculate a number of root moments (path integral of the function multiplied by a power of z) equal to number of zeros. Using Newton's Identites, the root moments become the coefficients of a polynomial that shares the same roots as your complex transcendental equation. Yikes!
- Documentation!

## Contributing

Really? Sure. Please do! Just please write tests.

    $ grunt test

## License

You're free to steal any parts you want and call them your own. You're free to integrate parts of this library into your own project. Just please let me know if you do. This project uses the MIT License (MIT).
