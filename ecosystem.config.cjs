module.exports = {
  apps : [
      {
        name: "www.learnnodejs.com",
        script: "./bin/www.js",
        watch: false,
        instances: 'max',
        exec_mode: 'cluster',//fork default
        increment_var : 'PORT',
        instance_var: 'INSTANCE_ID',
        autorestart: false,
        env: {
            "PORT": 3000,
            "NODE_ENV": "development",
            "DATABASE_URL":'localhost',
            "DATABASE_USER":'root',
            "DATABASE":'axelwu',
            "DATABASE_PWD":'wutao123',
            "OPENAI_API_KEY":'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'
        },
        env_production: {
            "PORT": 3001,
            "NODE_ENV": "production",
            "DATABASE_URL":'localhost',
            "DATABASE_USER":'root',
            "DATABASE":'axelwu',
            "DATABASE_PWD":'wutao123',
            "OPENAI_API_KEY":'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'
        }
      }
  ]
}
