var express = require('express');
var router = express.Router();
const Comment = require('../controllers/commentController')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.post('/add', Comment.create);
router.get('/get', Comment.getAll);
router.get('/get/:id', Comment.getById);
router.get('/getByPost/:id', Comment.getByPostId);

module.exports = router;
