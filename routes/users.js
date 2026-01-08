import express from 'express';
import usersController from '../controllers/usersController.js';

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/add', usersController.add);


// Define a simple GET endpoint
router.get('/greeting', (req, res) => {
  const name = req.query.name || 'Guest'; 
  // Get name from query parameter, default to 'Guest'
  var test = `hello! ${name}!!!`
  res.json({ message: `Hello, ${name}!` });
});


export default router;
