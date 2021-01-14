//Imports
var express = require('express');
var simulate_dataCtrl = require('./routes/simulate_dataCtrl.js');
var real_dataCtrl = require('./routes/real_dataCtrl.js');
var adminCtrl = require('./routes/adminCtrl.js');

//Routers 
exports.router = (function() {
    var apiRouter = express.Router();

    //Users routes
    //apiRouter.route('/users/register/').post(usersCtrl.register);
    //apiRouter.route('/users/login/').post(usersCtrl.login);

    //Routes real_data
    apiRouter.route('/real_data/create_feu').post(real_dataCtrl.create_feu);
    apiRouter.route('/real_data/get_feu/').get(real_dataCtrl.get_feu);
    apiRouter.route('/real_data/affectation_vehicule').post(real_dataCtrl.affectation_vehicule);
    apiRouter.route('/real_data/get_vehicule').get(real_dataCtrl.get_vehicule);
    apiRouter.route('/real_data/vehicule_dispo').get(real_dataCtrl.vehicule_dispo);
    apiRouter.route('/real_data/vehicule_non_dispo').get(real_dataCtrl.vehicule_non_dispo);
    apiRouter.route('/real_data/get_caserne').get(real_dataCtrl.get_caserne);
    apiRouter.route('/real_data/reset_vehicule').post(real_dataCtrl.reset_vehicule);
    apiRouter.route('/real_data/update_feu').post(real_dataCtrl.update_feu);

    //Routes simulate_data
    apiRouter.route('/simul_data/feu').post(simulate_dataCtrl.create_feu);
    apiRouter.route('/simul_data/get_feu').get(simulate_dataCtrl.get_feu);
    apiRouter.route('/simul_data/get_solo_feu/:id').get(simulate_dataCtrl.get_solo_feu);

    //Routes admin
    apiRouter.route('/admin/set_vehicule').post(adminCtrl.set_vehicule);
    apiRouter.route('/admin/set_caserne').post(adminCtrl.set_caserne);
    apiRouter.route('/admin/set_type_vehicule').post(adminCtrl.set_type_vehicule);


    return apiRouter;
    
})();

