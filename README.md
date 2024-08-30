Abrimos una terminal en VS Code
npm install -g npm                                  --> Instalamos npm de forma general
npm init -y                                         --> Crea el archivo package.json
Crear el archivo index.ts dentro                    --> Inicio del proyecto
console.log('Server on PORT 3000');                 --> Console.log para ver su funcionamiento luego de ejecutar la carpeta dist
npm install typescript --save-dev                   --> Crea el compilador de TypeScript
npx tsc --init                                      --> Crea el archivo tsconfig.json
Configurar el archivo tsconfig.json                 --> Se configura el archivo tsconfig.json
npx tsc                                             --> Compila y genera la carpeta "dist" con los archivos que compilan TypeScript a JavaScript
node dist index.js                                  --> Probamos el funcionamiento de la carpeta "dist" ejecutando ese comando en la terminal para visualizar el console.log('Server on PORT 3000');
npm i tslint --save-dev                             --> Añadimos reglas adicionales a TypeScript según los estándares de desarrollo
./node_modules/.bin/tslint --init o npx tslint --init   --> Ejecutamos estos comandos en la terminal para crear e inicilializar el archivo tslint.json
Configuramos el archivo tslint.json                 --> Se configura para que no arroje errores la consola
Cerramos todas las terminales                       --> Cerramos todas las terminales de VS Code
Abrimos una terminal y ejecutamos npx tsc           --> Compilamos de nuevo
node dist index.js                                  --> Inicializamos de nuevo el proyecto para probar que todo funcione
Cerramos todas las terminales                       --> Cerramos todas las terminales de VS Code
Crear el archivo app.ts                             --> Crear el archivo para empezar a configurar el servidor

instalamos:
npm i express cors dotenv                           --> Se instala Express, Cors y dotenv
npm i --save-dev @types/express                     --> Se instala la declaración de tipos para Express para que quede escrito en TypeScript
npm i --save-dev @types/cors                        --> Se instala la declaración de tipos para Cors para que quede escrito en TypeScript

En el package.json, modificamos el valor del main debajo agrgamos "type": "module" para activar con "import" y "export":
"main": "dist/index.js",
"type": "module",

npm i nodemon -D                                    --> Para que el servidor se inicialice automáticamente cada que guardemos
Creamos los scripts en el package.json:
  "scripts": {
    "build": "tsc",
    "dev": "nodemon dist/index.js",
    "start": "node dist/index.js"
  },

creamos en la línea "type": "module",

Configurar en forma básica el app.ts                --> Configurar el servidor de forma básicamente
Configurar en forma básica el index.ts              --> Crear el servidor de forma básica
Crear el archivo .env en la raíz                    --> Cear el archivo .env y las variables de entorno
npx tsc                                             --> Compilamos de nuevo
node dist index.js                                  --> Inicializamos de nuevo el proyecto para probar que todo funcione
Abrir http://localhost:3000/ en el navegador        --> Probamos que el servidor ya haya sido inicializado, debe arrojar este error Cannot GET /
Cerramos todo                                       --> Cerramos todos los archivos y terminales de VS Code
npm run dev                                         --> Inicializamos el backend
Abro un cmd normal, NO EN MODO ADMINISTRATDOR
Me ubico en la carpeta api del proyecto             --> Nos ubicamos para compilar y ejecutar el --watch
npx tsc                                             --> Compilo el proyecto
npx tsc --watch                                     --> Ejecuto --watch para compilar el código TypeScript automáticamente








Crear la carpeta "src"                              --> Inicio del proyecto




Cerramos todas las terminales                       --> Cerramos todas las terminales de VS Code
Crear el archivo app.ts dentro de "src"             --> Crear el archivo para empezar a configurar el servidor
npm i express cors dotenv                           --> Se instala Express, Cors y dotenv
npm i --save-dev @types/express                     --> Se instala la declaración de tipos para Express para que quede escrito en TypeScript

npx tsc                                             --> Compilamos de nuevo
node dist index.js                                  --> Inicializamos de nuevo el proyecto para probar que todo funcione
La terminal de VS Code muestra los errores en la aplicación
El cmd muestra los errores en la compilación de TypeScript
npx tsc                                             --> Para compilar de nuevo TypeScript
npm run dev                                         --> Para inicializar el servidor de nuevo
Crear la primer ruta                                --> Crear la primer ruta de forma básica para probar su funcionamiento
npm i morgan                                        --> Instalamos Morgan para visualizar los tipos de peticiones que llegan al backend
npm i --save-dev @types/morgan                      --> Se instala la declaración de tipos para Morgan para que quede escrito en TypeScript
npm i --save-dev @types/cors                        --> Se instala la declaración de tipos para cors para que quede escrito en TypeScript
npm i --save sequelize
npm install mysql2 --save