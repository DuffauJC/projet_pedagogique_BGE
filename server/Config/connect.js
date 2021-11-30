const mongoose = require('mongoose');

//Connexion à mongoodb avec mongoose
mongoose.connect('mongodb+srv://xxxxxxxx@xxxxxxxxx.fxio2.azure.mongodb.net/xxxx?retryWrites=true&w=majority', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
   
  })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: Impossible de se connecter à la DB.'));
db.once('open', () => {
    console.log('Connexion réussie !!')// we're connected!
});