var models = require('../models');

module.exports = {
    create_feu: function(req, res) {


       //Params
        var x = req.body.x;
        var y = req.body.y;
        var i = req.body.i;
  
        var newFeu_simule = models.Simulate_data.models.Feu_simule.create({
            intensite: i,
            x: x,
            y: y
        })
        .then(function(newFeu_simule){
            return res.status(201).json({
                'IdFeu_reel': newFeu_simule.id
            })
        })
        .catch(function(err) {
                return res.status(501).json({ 'Erreur insertion feu' : err });
              });
    },

    get_solo_feu: function(req, res) {
    
        var id = req.params.id;
        var test = models.Simulate_data.models.Feu_simule.findAll({
            where: {
              id: id
            }
          })
        .then(function(test){
            return res.status(201).send(test[0])
        })
        .catch(function(err){
            return res.status(501).send("erreur lors de la recherche du feu")
        })
    },

    get_feu: function(req, res) {
    
        var id = req.params.id;
        var allFeu = models.Simulate_data.models.Feu_simule.findAll()
        .then(function(allFeu){
            return res.status(201).send(allFeu)
        })
        .catch(function(err){
            return res.status(501).send("erreur lors du listing des feux")
        })
    },
}