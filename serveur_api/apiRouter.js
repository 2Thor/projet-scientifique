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
    apiRouter.route('/real_data/feu').post(real_dataCtrl.create_feu);
    apiRouter.route('/real_data/get_feu').get(real_dataCtrl.get_feu);

    //Routes real_data
    apiRouter.route('/simul_data/feu').post(simulate_dataCtrl.create_feu);
    apiRouter.route('/simul_data/get_feu/:id').get(simulate_dataCtrl.get_feu);

    //Routes admin
    apiRouter.route('/admin/set_camion/').post(adminCtrl.set_camion);
    apiRouter.route('/admin/set_caserne/').post(adminCtrl.set_caserne);

    return apiRouter;
    
})();

