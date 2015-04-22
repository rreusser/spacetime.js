# spacetime.js

spacetime.js is just a few days old, but it represents an ambitious attempt to close the gap between JavaScript's computing ability and that of most other modern programming languages. It lacks documentation at the moment (forthcoming once the API solidifies a bit), but its feature set will hopefully grow quickly.

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

At the top of my list:

- Implement the [Jenkins-Traub root-finding algorithm](http://en.wikipedia.org/wiki/Jenkins%E2%80%93Traub_algorithm) to calculate complex polynomial roots.
- Implement the [Delves-Lyness method](http://www.ams.org/journals/mcom/1967-21-100/S0025-5718-1967-0228165-4/) to directly calculate the roots of a complex transcendental equation. It works like this: You use path integrals to encircle roots. Then you calculate a number of root moments (path integral of the function multiplied by a power of z) equal to number of zeros. Using Newton's Identites, the root moments become the coefficients of a polynomial that shares the same roots as your complex transcendental equation. Yikes!
