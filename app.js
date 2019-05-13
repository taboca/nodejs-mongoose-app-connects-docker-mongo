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

