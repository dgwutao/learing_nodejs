import dbHub from '../repositories/dbConnector.js';

const get = (req, res)=>{
    dbindex.query('select * from users', (err, results)=>{
        res.json(results)
    })
}

const getAsync = async (req,res)=>{
    const data = await dbHub.query('select * from users')
    res.json(data.results)
}

export default {get,getAsync}