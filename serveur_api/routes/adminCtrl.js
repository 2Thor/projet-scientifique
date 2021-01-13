var models = require('../models');

module.exports = {
    set_caserne: function(req, res){
        
        //Params
        var name = req.body.nom;
        var x = req.body.x;
        var y = req.body.y;
        var max = req.body.max
        
        var newCasere = models.Real_data.models.Caserne.create({
            name: name,
            x: x,
            y: y,
            max_camion: max
        })
        .then(function(newCaserne){
            return res.status(201).json({
                'IdNewCaserne': newCaserne.id
            })
         })
        .catch(function(err) {
            return res.status(500).json({ 'Erreur caserne' : err });
        });
    },
    set_camion: function(req, res){

    }
}

