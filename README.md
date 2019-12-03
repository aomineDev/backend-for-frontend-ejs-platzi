# Backend for Frontend - EJS Platzi

![BFF](./md/bff.jpg)

## Redux Thunk
### ¿Qué es un Thunk?
Una función dentro de otra función, lo especial es que es una función que retorna otra función y redux thunk lo que hace con este thunk es hacerle un atach o un bind de la función dispatch para disparar acciones y la función getState, que nos garantiza poder controlar el flujo de nuestra data segun cada acción como registro o manjejo de errores.