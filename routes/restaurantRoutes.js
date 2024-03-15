const router = require('express').Router();
const restaurantController = require('../controllers/restaurantController');
const bodyparser = require('body-parser');

router.get('/', restaurantController.getTop3);

router.get('/logged/:id', restaurantController.getTop3);

router.get('/login', restaurantController.loginpage);

router.post('/login', bodyparser.json(), restaurantController.login);

router.get('/viewProfile/logged/:id/profile/:id2', restaurantController.viewProfile);

router.get('/viewRestaurant/:id2/logged/:id', restaurantController.viewResto);

router.get('/viewRestaurant/:id2', restaurantController.viewResto);

module.exports = router;