var bcrypt = require('bcrypt');
var models = require('../models');

module.exports = {
    register: function(req, res) {

        //Params
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.pass;
        var bio = req.body.bio;

        bcrypt.hash(password, 5, function(err, bcryptedPassword ) {
            var newUser = models.User.create({
                email: email,
                username : username,
                password: bcryptedPassword,
                bio: bio,
                isAdmin: 0
            })
            .then(function(newUser){
                return res.status(201).json({
                    'userId': newUser.id
                })
            })
            .catch(function(err) {
              return res.status(500).json({ 'grosse erreur' : err });
            });
        })

    },

    login: function(req, res) {

    }
}