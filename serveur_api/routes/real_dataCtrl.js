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
        .catch(function(err){
            return res.status(500).json({ 'Erreur recherche feu' : err });
        });


    },

    vehicule_dispo: function(req,res){

        var vehicule_disponible = models.Real_data.models.Vehicule.findAll({
            where: {
                idFeu : {
                    [Op.eq]: 0,
                }
                
            }
        })
        .then(function(vehicule_disponible){
            return res.status(201).send(vehicule_disponible)
        })
        .catch(function(err){
            return res.status(501).json({ 'erreur vehicules disponibles' : err });
        });

    },

    vehicule_non_dispo: function(req,res){

        var vehicule_disponible = models.Real_data.models.Vehicule.findAll({
            where: {
                idFeu : {
                    [Op.ne]: 0,
                }
                
            }
        })
        .then(function(vehicule_disponible){
            return res.status(201).send(vehicule_disponible)
        })
        .catch(function(err){
            return res.status(501).json({ 'erreur vehicules disponibles' : err });
        });
        
    },

    get_vehicule: function(req,res){
        
        var allVehicule = models.Real_data.models.Vehicule.findAll()
        .then(function(allVehicule){
            return res.status(201).send(allVehicule)
        })
        .catch(function(err){
            return res.status(501).json({ 'erreur listing vehicule' : err });
        })
    },

    affectation_vehicule: function(req,res){

        //Params
        idFeu = req.body.feu,
        idVehicule = req.body.vehicule

        var testVehicule = models.Real_data.models.Vehicule.findOne({
            where: {
                id: idVehicule,  
            }
        })
        .then(function(testVehicule){
            if(testVehicule){
                var testFeu = models.Real_data.models.Feu_reel.findOne({
                    where: {
                        id: idFeu,  
                    }
                })
                .then(function(testFeu){
                    if(testFeu){
                        models.Real_data.models.Vehicule.update({ idFeu : idFeu, x: testFeu.x, y: testFeu.y },
                            { where: {
                                id: idVehicule
                            }
                        })
                        .then(function(){
                            return res.status(201).send("L'affectation à bien été effectué")
                        })
                        .catch(function(err){
                            return res.status(501).json({ 'erreur lors de l\'insertion de l\'affectation' : err });
                        })
                    }
                    else{
                        return res.status(501).send("Erreur : feu non existant")
                    }
                })
            }
            else{
                return res.status(501).send("Erreur : vehicule non existant")
            }
        })
    },

    get_caserne: function(req, res){
        var allCaserne = models.Real_data.models.Caserne.findAll()
        .then(function(allCaserne){
            return res.status(201).send(allCaserne)
        })
        .catch(function(err){
            return res.status(501).json({ 'erreur listing casernes' : err });
        })
    },

    reset_vehicule: function(req, res){

            //Params
            idCaserne = req.body.caserne,
            idVehicule = req.body.vehicule

            var newCaserne = models.Real_data.models.Caserne.findOne({
                where: {
                    id: idCaserne
                }
            })
            .then(function(newCaserne){
                models.Real_data.models.Vehicule.update({ x: newCaserne.x, y: newCaserne.y, idFeu: 0 },
                    { where: {
                        id: idVehicule
                    }
                })
                .then(function(){
                    return res.status(201).send("Reset effectué")
                })
                .catch(function(err){
                    res.status(501).json({ 'erreur reset' : err });
                })
            })
            .catch(function(err){
                return res.status(501).json({ 'erreur caserne non existante' : err });
            })
    }
}
    