var models = require('../models');

module.exports = {
    create_feu: function(req, res) {


        console.log(models)
       //Params
        var x = req.body.x;
        var y = req.body.y;
        var i = req.body.i;
        
        var newCoord = models.Simulate_data.models.Coordonnee.create({
            latitude: x,
            longitude: y,
        })

        .then(function(newCoord){
            var newFeu_reel = models.Simulate_data.models.Feu_simule.create({
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