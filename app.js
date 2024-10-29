const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');


const adminRoutes = require('./routes/admin')
const tiendaRoutes = require('./routes/tienda')
const errorController = require('./controllers/error');
const Usuario = require('./models/usuario');

const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


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


app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://jcabelloc:secreto@cluster0.m3us8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
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



