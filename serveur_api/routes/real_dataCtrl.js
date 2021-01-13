var models = require('../models');

module.exports = {
    create_feu: function(req, res) {


       //Params
        var x = req.body.x;
        var y = req.body.y;
        var i = req.body.i;
        
        var newCoord = models.Real_data.models.Coordonnee.create({
            latitude: x,
            longitude: y,
        })

        .then(function(newCoord){
            var newFeu_reel = models.Real_data.models.Feu_reel.create({
                intensite: i,
                idCoordonnee: newCoord.id
            })
            .then(function(newFeu_reel){
                return res.status(201).json({
                    'IdFeu_reel': newFeu_reel.id,
                    'idCoord': newCoord.id
                })
    
            })
            .catch(function(err) {
                return res.status(500).json({ 'Erreur insertion feu' : err });
              });
        })
        .catch(function(err) {
            return res.status(500).json({ 'Erreur insertion coordonne' : err });
          });
    },
}