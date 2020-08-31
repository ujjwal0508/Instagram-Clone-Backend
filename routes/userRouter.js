var express = require('express');
var router = express.Router();
const User = require('../controllers/userController')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.post('/add', User.create);
router.get('/get', User.getAll);
router.get('/get/:id', User.getById);
router.get('/handle/:handle', User.getByHandle);
router.post('/request', User.requestFollow);
router.post('/accept', User.acceptFollow);
router.post('/getFeed', User.getUserFeed);

module.exports = router;
