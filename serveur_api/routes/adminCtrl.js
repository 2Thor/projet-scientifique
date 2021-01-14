var models = require('../models');

module.exports = {
    set_caserne: function(req, res){
        
        //Params
        var name = req.body.nom;
        var x = req.body.x;
        var y = req.body.y;
        var max = req.body.max
        
        var newCasere = models.Real_data.models.Caserne.create({
            nom: name,
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
    set_vehicule: function(req, res){
       
        //Params
        var idType = req.body.type
        var idCaserne = req.body.caserne
        
        var testType = models.Real_data.models.Type_vehicule.findOne({
            where: {
                id: idType
            }
        })
        .then(function(testType){
            if (testType){
                var testCaserne = models.Real_data.models.Caserne.findOne({
                    where: {
                        id: idCaserne
                    }
                })
                .then(function(testCaserne){
                    if(testCaserne){
                        var newVehicule = models.Real_data.models.Vehicule.create({
                            idType : idType,
                            idCaserne: idCaserne,
                            x: testCaserne.x,
                            y: testCaserne.x
                        })
                        .then(function(newVehicule){
                            return res.status(501).json({
                                'idNewVehicule':newVehicule.id
                            })
                        })
                    }
                    else{
                        return res.status(501).send("Caserne non existante")
                    }
                })


            }
            else{
                return res.status(501).send("Type de vehicule non existant")
            }
        })

    },

    set_type_vehicule: function(req, res){

        //Params
        var name = req.body.nom;
        var vitesse = req.body.vitesse;
        var efficacite = req.body.efficacite
        
        var NewType_vehicule = models.Real_data.models.Type_vehicule.create({
            name: name,
            vitesse: vitesse,
            efficacite: efficacite
        })
        .then(function(NewType_vehicule){
            return res.status(201).json({
                'IdNewType_vehicule': NewType_vehicule.id
            })
         })
        .catch(function(err) {
            return res.status(500).json({ 'Erreur insertion Tye de vehicule' : err });
        });
    }
}

