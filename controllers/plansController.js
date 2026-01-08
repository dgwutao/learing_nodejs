import dbindex from '../db/dbindex.js';

const get = (req, res)=>{
    dbindex.excute('select * from users', (err, results)=>{
        res.json(results)
    })
}

export default {get}