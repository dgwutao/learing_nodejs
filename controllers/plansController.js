const dbindex = require('../db/dbindex');

exports.get = (req, res)=>{
    dbindex.excute('select * from users', (err, results)=>{
        res.json(results)
    })
}