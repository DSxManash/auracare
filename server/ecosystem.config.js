{
  "name": "auracare-server",
  "script": "index.js",
  "instances": "max",
  "exec_mode": "cluster",
  "env": {
    "NODE_ENV": "development",
    "PORT": 5000
  },
  "env_production": {
    "NODE_ENV": "production",
    "PORT": 5000
  },
  "error_file": "./logs/pm2-error.log",
  "out_file": "./logs/pm2-out.log",
  "log_file": "./logs/pm2-combined.log",
  "time": true,
  "max_memory_restart": "1G",
  "restart_delay": 4000,
  "max_restarts": 10,
  "min_uptime": "10s",
  "watch": false,
  "ignore_watch": [
    "logs",
    "node_modules"
  ],
  "env_file": ".env"
}