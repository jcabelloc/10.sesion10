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