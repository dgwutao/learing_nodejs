import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index', { title: 'Express' });
  res.json({ title: 'Express' })
});

export default router;
