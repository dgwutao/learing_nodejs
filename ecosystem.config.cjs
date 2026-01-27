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

        // 日志配置
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
        error_file: 'logs/error.log',
        out_file: 'logs/out.log',
        merge_logs: true,
        
        // 性能监控
        node_args: '--trace-warnings --max-old-space-size=2048',
        
        // 重启策略
        min_uptime: '10s',
        max_restarts: 10,
        
        // 优雅关闭
        kill_timeout: 3000,
        listen_timeout: 3000,
        
        // 高级特性
        autorestart: true,
        restart_delay: 5000,
        
        // 源映射支持
        source_map_support: true,
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
