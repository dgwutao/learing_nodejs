import db from '../repositories/dbConnector';

const get = ()=>{

}

const getAsync = async ()=>{
    const data = await db.query('select * from users')
}

export default {get,getAsync}