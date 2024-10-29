exports.getIngresar = (req, res, next) => {
    res.render('auth/ingresar', {
      path: '/ingresar',
      titulo: 'Ingresar'
    });
  };

exports.postIngresar = (req, res, next) => {
    res.setHeader('Set-Cookie', 'autenticado=true');
    //res.setHeader('Set-Cookie', 'autenticado=true; HttpOnly');
    //res.setHeader('Set-Cookie', 'autenticado=true; HttpOnly; Secure');
    res.redirect('/');
};