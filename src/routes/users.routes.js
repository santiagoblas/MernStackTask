const router = require('express').Router();
const User = require('../models/user');

const passport = require('passport');

router.get('/signin', (req,res) => {
    res.render('login');
});

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/signin',
    failureFlash: true
}));

router.get('/users/signup', (req,res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req,res) => {
    const {
        name, 
        email, 
        password, 
        confirm_password
    } = req.body;

    const errors = []

    if(name.length <= 0) {
        errors.push({text: "El Nombre es requerido"});
    }
    if(email.length <= 0) {
        errors.push({text: "El E-mail es requerido"});
    }
    if(password != confirm_password) {
        errors.push({text: "Las contraseñas no coinciden"});
    }
    if(password.length < 8) {
        errors.push({text: "La Contraseña debe tener al menos 8 caracteres"});
    }
    if(errors.length > 0) {
        res.render('users/signup', {errors, name, email, password, confirm_password});
    } else {
        const emailUser = await User.findOne({email: email});

        if(emailUser) {
            req.flash("error_msg", "El E-mail ya fue utilizado");
            res.redirect("users/signup");
        }

        const user = new User({name, email, password});
        user.password = await user.encryptPassword(password);
        await user.save();

        req.flash("success_msg", "Usuario registrado");
        res.redirect("/users/signin");
    }
});

router.get('/users/signout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;