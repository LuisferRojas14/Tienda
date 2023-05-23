# Next.js Teslo Shop
Para correr localmente, se necesita la base de datos.
```
 docker-compose up -d
```
 
* El -d, significa __detached__



## Configurar la variable de entorno
Renombrar el archivo __.env.template__a__.env__
*MongoDB URL Local:
```
MONGO_URL=mongodb://localhost:27017/teslodb
```

* Reconstruir los módulos de node y levantar Next
```
yarn install
yarn dev
```


## Llenar la base de datos con la informacion de pruebas

Llamara:
```
http://localhost:3000/api/seed
```
