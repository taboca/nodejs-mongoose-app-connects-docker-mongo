# A very simple sample with a NodeJS-based script that connects with Mongo db inside a Docker-based container 

## Setup your container with Mongo

Make sure you have Docker and docker-compose that will be using the docker-compose.yml script in this project directory. 

```
docker-compose up 
```

Docker-compose will setup a new container based in the docker-compose.yml: 

```
version: "3"

services:

  mongo:
    image: mongo
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
    ports:
      - 27017:27017

  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - 8081:8081
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: example
```


## Install Mongoose and run the app 

```
npm install
```

For testing the script use

```
node app.js
```

