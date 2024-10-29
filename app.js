const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = 'mongodb+srv://jcabelloc:secreto@cluster0.m3us8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';



const adminRoutes = require('./routes/admin')
const tiendaRoutes = require('./routes/tienda')
const authRoutes = require('./routes/auth')
const errorController = require('./controllers/error');
const Usuario = require('./models/usuario');

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'algo muy secreto', resave: false, saveUninitialized: false, store: store }));



app.use((req, res, next) => {
    Usuario.findById('671c59f25e11c1a2041ed6ad')
        .then(usuario => {
            req.usuario = usuario;
            next();
        })
        .catch(err => console.log(err));

});

app.use('/admin', adminRoutes);
app.use(tiendaRoutes);
app.use(authRoutes);


app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    console.log(result)

    Usuario.findOne().then(usuario => {
        if (!usuario) {
          const usuario = new Usuario({
            nombre: 'Juan',
            email: 'juan@gmail.com',
            carrito: {
              items: []
            }
          });
          usuario.save();
        }
      });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });



