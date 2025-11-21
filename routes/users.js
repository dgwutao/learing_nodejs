var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/add', function(req, res, next) {
  res.send('respond with a add');
});


// Define a simple GET endpoint
router.get('/greeting', (req, res) => {
  const name = req.query.name || 'Guest'; 
  // Get name from query parameter, default to 'Guest'
  var test = `hello! ${name}!!!`
  res.json({ message: `Hello, ${name}!` });
});


module.exports = router;
