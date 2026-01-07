const express = require('express');
const dbindex = require('../db/dbindex');
const testMiddleware = require('../middlewares/testMiddleware')
const plansController = require('../controllers/plansController');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource from plan');
});

/* GET users listing. */
router.get('/add', function(req, res) {
  const name = req.query.name ?? ''
  const hight = req.query.hight ?? 0
  const weight = req.query.weight ?? 0
  const sql = `insert into users (name,hight,weight) values (?, ?, ?)`
  const params = [name, hight, weight]
  dbindex.excuteParams(sql, params,(err, results)=>{
    res.json(results)
  })
});

// Define a simple GET endpoint
router.get('/get', [testMiddleware.mw1,testMiddleware.mw2] ,plansController.get);


// Define a simple GET endpoint
router.get('/del', (req, res) => {
  const name = req.query.name ?? 'Guest'; 
  // Get name from query parameter, default to 'Guest'
  dbindex.excuteQuery('select * from users')
  res.json({ message: `plan, ${name}!` });
});

// export default router
module.exports = router;

