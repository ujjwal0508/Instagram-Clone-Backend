var express = require('express');
var router = express.Router();
const Post = require('../controllers/postController')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.post('/add', Post.create);
router.get('/get', Post.getAll);
router.get('/get/:id', Post.getById);
module.exports = router;
