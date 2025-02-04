# Autenticación con roles  
Lo primero que haremos es clonar el repositorio  
``
git clone https://github.com/aaronvigil96/authNest  
``
  
`` cd authNest ``
  
Una vez dentro de la carpeta vamos a instalar las dependecias
    
``
npm i
``
  
Creamos el .env y replicaremos todas la variables de entorno teniendo como modelo el .env.example
  
``
touch .env
``
  
Una vez que hayamos creado y asignado un valor a las variables de entorno, vamos a levantar el contenedor con docker compose. El -d es para que corra en segundo plano
  
``
docker compose up -d
``

Ahora vamos a ejecutar npx prisma migrate dev para crear y ejecutar archivos de migración para prisma  
``
npx prisma migrate dev
``
  
Nos pedirá el nombre de la migración, coloca lo que desees.
  
Ahora, solamente nos queda levantar la aplicación.  
``
npm run start:dev
``
