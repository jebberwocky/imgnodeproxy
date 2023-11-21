module.exports = {
  apps : [{
    name: 'imgproxy_node',
    script: 'index.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
