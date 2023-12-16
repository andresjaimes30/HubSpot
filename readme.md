# Api con webhook de conexion a Hubspot

Esta api permite la consulta de conexion a la api de Hubspot por medio de webhook, este se coloca en la cuenta o aplicacion principal y una vez pase una actualizacion o nuevo registo en los objecto Company y Contact el webhook recibira la solicitud y hara los mismos cambios a la cuenta espejo que se añade, la cuenta espejo se añade con el token de acceso.

- la version de node debe ser mayor o igual a 18.x

## Como Correr este proyecto.

- Installar dependencias.

```
    npm run install
```

- Colocar variables de entorno en la raiz del proyecto, creando el archivo .env

```
    TOKEN=token_de_la_app_principal_de_hubspot
    TOKEN_MIRROR=token_de_la_app_de_mirror_espejo
```

- Correr en modo desarrollo

```
    npm run dev
```

- Correr en modo produccion

```
    npm run start
```

## Como añadir los datos de Rick and Morty a Hubspot ?

Necesitas tener el servidor o api corriendo en internet, ademas de que el webhook este configurado en las apps de Hubspot, una vez todo funcionando puedes ejecutar el escript:

```
    npm run seed
```

este escript lo que hara es traerse los datos de la api de Rick and Morty, luego los mapea a la estrutura de las apps de Hubspot y lo que hace es crear todos los Contacts que tengan de ID un numero primo. despues en la aplicacion principal una vez se cree algun registro esta enviara una solicitud al webhook configurado para que asi el webhook pueda hacer los mismo cambios en la aplicacion espejo.
