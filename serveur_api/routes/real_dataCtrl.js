var models = require('../models');
const { Op } = require("sequelize");

module.exports = {
    create_feu: function(req, res) {

        
       //Params
        var x = req.body.x;
        var y = req.body.y;
        var i = req.body.i;
        
        //Verification si le feu existe deja

        var newFeu_reelCheck = models.Real_data.models.Feu_reel.findOne({
            where: {
              x: x,
              y:y
            }
          })
            .then(function(newFeu_reelCheck){
                if (!newFeu_reelCheck){
                    var newFeu_reel = models.Real_data.models.Feu_reel.create({
                        intensite:i,
                        x: x,
                        y: y
                    })
                    .then(function(newFeu_reel){
                        return res.status(201).json({
                            'IdFeu_reel': newFeu_reel.id,
                        })
                    })
                }
                else{
                    var newFeu_reelUpdate = models.Real_data.models.Feu_reel.update({ intensite: i},
                        { where: {
                            x: x,
                            y :y
                            }
                        })
                    .then(function(newFeu_reelUpdate){
                        return res.status(201).send("Mise à jour effectué")
                    })
                }  
            })
            .catch(function(err) {
                return res.status(500).json({ 'Erreur recherche feu existant' : err });
              });
    },

    get_feu: function(req, res) {
        var newFeu_reel = models.Real_data.models.Feu_reel.findAll({
            where: {
                intensite : {
                    [Op.ne]: 0,
                }
                
            }
        })
        .then(function(newFeu_reel){
            return res.status(201).send(newFeu_reel)
        })


},
}
    