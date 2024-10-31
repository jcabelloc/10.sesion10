const Usuario = require('../models/usuario')

exports.getIngresar = (req, res, next) => {
    console.log(req.session.autenticado);
    res.render('auth/ingresar', {
      path: '/ingresar',
      titulo: 'Ingresar',
      autenticado: false
    });
  };

exports.postIngresar = (req, res, next) => {
    Usuario.findById('671c59f25e11c1a2041ed6ad')
      .then(usuario => {
        req.session.autenticado = true;
        req.session.usuario = usuario;
        req.session.save(err => {
          console.log(err);
          res.redirect('/')
        })

      })
      .catch(err => console.log(err));
};

exports.getRegistrarse = (req, res, next) => {
  res.render('auth/registrarse', {
    path: '/registrarse',
    titulo: 'Registrarse',
    autenticado: false
  });
};

exports.postRegistrarse = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirmado = req.body.passwordConfirmado;
  Usuario.findOne({ email: email })
    .then(usuarioDoc => {
      if (usuarioDoc) {
        return res.redirect('/registrarse');
      }
      const usuario = new Usuario({
        email: email,
        password: password,
        carrito: { items: [] }
      });
      return usuario.save();
    })
    .then(result => {
      res.redirect('/ingresar');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postSalir = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};