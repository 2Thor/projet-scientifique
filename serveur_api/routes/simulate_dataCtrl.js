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
            var newFeu_simule = models.Simulate_data.models.Feu_simule.create({
                intensite: i,
                idCoordonnee: newCoord.id
            })
            .then(function(newFeu_simule){
                return res.status(201).json({
                    'IdFeu_reel': newFeu_simule.id,
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

    get_feu: function(req, res) {
        /*models.Simulate_data.models.Feu_simule.findOne({
            attributes: ['intensite'],
            where: {intensite: '27'}
        })
        .then(function())*/

        var id = req.params.id;
        var test = models.Simulate_data.models.Feu_simule.findAll({
            where: {
              id: id
            }
          })
        .then(function(test){
            return res.status(201).json({
                'Réponse': test[0]
            })
        })
    },
}