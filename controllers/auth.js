exports.getIngresar = (req, res, next) => {
    res.render('auth/ingresar', {
      path: '/ingresar',
      titulo: 'Ingresar'
    });
  };