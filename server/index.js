const express = require('express');
const { ApolloServer, AuthenticationError } = require('apollo-server-express')
const schema = require('./schemas/schema');
const cors = require('cors');
const expressJwt = require("express-jwt");
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');
const Comptes = require('./models/comptes');
const bcrypt = require('bcrypt'); //  cryptage mdp

const SECRET = "125gthi85$$eft"

const port = 4000;
const app = express();
const myGraphQLSchema = schema;

// Mongodb connect
require('./Config/connect');


app.use(cors());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  expressJwt({
    secret: "125gthi85$$eft",
    algorithms: ["HS256"],
    credentialsRequired: false
  })
)


///////////// Login ///////////////

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  console.log(email, password)

  // Verif de l'email si utilisateur enregistré 
  const compte = Comptes.find({ email: email })
  console.log(compte)

  if (!compte) {
    res.sendStatus(401);
    return;
  }
  if (email === compte.email) {
    //verif mot de passe
    bcrypt.compare(password, compte.motDePasse, (err) => {
      if (err) {
        throw new Error("Invalid credentials.");
      }
    })
  }
  const token = jwt.sign(
    { role: compte.role, id: compte.id, nom: compte.nom, prenom: compte.prenom }, SECRET, { algorithm: "HS256", expiresIn: "2h" }
  )
  console.log(token)
  res.send({ token });
});


//////////////////// context

const context = ({ req }) => {

  const authorizationHeader = req.headers.authorization || '';
  const token = authorizationHeader.split(' ')[1];
  if (!token) throw new Error("Authentication token is required.");

  try {
    const { id, role, nom, prenom } = jwt.verify(token, SECRET)
    return { id, role, nom, prenom }
  } catch (e) {
    throw new AuthenticationError(
      'Authentication token is invalid, please log in',
    )
  }
}

//////////////////////////////// Server //////////////////////////
const server = new ApolloServer({
  schema: myGraphQLSchema,
  context,
});

server.applyMiddleware({ app, path: '/' })
app.listen(port, () =>
  console.log(`🚀 Server ready at http://localhost:${port}`)
);

