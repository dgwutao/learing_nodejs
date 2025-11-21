module.exports = {
  apps : [
      {
        name: "axel.wu",
        script: "./bin/www.js",
        watch: true,
        // instances: 2,max
        // exec_mode: "cluster",fork default
        // increment_var : 'PORT',
        // instance_var: 'INSTANCE_ID',
        env: {
            "PORT": 3000,
            "NODE_ENV": "development",
            "DATABASE_URL":'localhost',
            "DATABASE_USER":'root',
            "DATABASE":'axelwu',
            "DATABASE_PWD":'wutao123'
        },
        env_production: {
            "PORT": 80,
            "NODE_ENV": "production",
            "DATABASE_URL":'localhost',
            "DATABASE_USER":'root',
            "DATABASE":'axelwu',
            "DATABASE_PWD":'wutao123'
        }
      }
  ]
}
