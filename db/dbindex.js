import mysql from 'mysql2';

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PWD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, 
  // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, 
  // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// 'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',['Morty', 14]
const excute = (sql, complete)=>{
    pool.getConnection((err, conn)=> {
        if (err) {
            complete(err, null)
            return
        }
        conn.execute(sql, (err, results, fields) => {
            complete(err, results)
        })
        pool.releaseConnection(conn);
        // conn.release()
    });
}

const excuteParams = (sql, params, complete)=>{
    pool.getConnection((err, conn)=> {
            if (err) {
                complete(err, null)
                return
            }
            conn.execute(sql, params, (err, results, fields) => {
                complete(err, results)
            })
            pool.releaseConnection(conn);
            // conn.release()
    });
}

export default {
    excute,
    excuteParams
}