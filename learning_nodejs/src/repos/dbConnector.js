import mysql from 'mysql2/promise';

// Create the connection pool. The pool-specific settings are the defaults
export const pool = mysql.createPool({
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PWD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// 'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',['Morty', 14]
const query = async (sql)=>{
    const conn = await pool.getConnection();
    let results,fields,err;
    try {
        const data = await conn.excute(sql)
        results = data.results
        fields = data.fields
    } catch (error) {
        err = error
    }
    pool.releaseConnection(conn);
    return {
        results,
        fields,
        err
    }
}

const excuteParams = async (sql, params)=>{
    const conn = await pool.getConnection();
    let results,fields,err;
    try {
        const data = await conn.excute(sql,params)
        results = data.results
        fields = data.fields
    } catch (error) {
        err = error
    }
    pool.releaseConnection(conn);
    return {
        results,
        fields,
        err
    }
}

export default {
    query,
    excuteParams
}