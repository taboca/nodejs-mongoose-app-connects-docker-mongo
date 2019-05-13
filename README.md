# An example of a NodeJS-based script that connects with Mongo db that lives inside a Docker-based container 

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

## The script

```
const mongoose   = require('mongoose');

let mongoDB = 'mongodb://root:example@127.0.0.1/MY_NEW_DB?authSource=admin';
mongoose.connect(mongoDB, { useNewUrlParser: true });

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {

  let Schema = mongoose.Schema;

  let ModelSchema = new Schema({
    name: String
  });

  let MyNewModel = mongoose.model('MyNewModel', ModelSchema );

  let awesome_instance = new MyNewModel({ name: 'John' });

  console.log(awesome_instance.name);

  awesome_instance.name="John 2";

  awesome_instance.save(function (err) {
      if (err) return (err) => {
        console.log(err);
      };
      console.log('saved!'); 
  }, awesome_instance);
});

```

## Testing the new db and newly created collection

You can use the second container, with Mongo Express, to check via local host port 8081 the newly created db from the above script. 
