const { validationResult } = require('express-validator');
const { readJSON } = require('../../data');

module.exports = (req, res) => {

    const errors = validationResult(req); // examina lo que viene del request!

    if (errors.isEmpty()) {
        const users = readJSON('users.json');
        const { email, remember } = req.body
        const user = users.find(user => user.email === email);
        const { id, name, rol } = user;

        req.session.userLogin = {
            id,
            name,
            rol
        }

        remember !== undefined && res.cookie('vidaOrganicaTheBest', req.session.userLogin, {
            maxAge: 1000 * 60
        })

        return res.redirect('/')

    } else {
        return res.render('login', {
            errors: errors.mapped(),
            old: req.body
        })
    }

}