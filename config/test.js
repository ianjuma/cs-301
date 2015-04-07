module.exports = {
    postgres: {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        authKey: process.env.POSTGRES_AUTH_KEY,
        db: "test"
    },
    elasticsearch: {
      host: 'localhost:9200',
      type: 'file',
      log: ['error', 'trace'],
      path: '/var/log/visiting_bgm.log',
      keepAlive: true,
      sniffOnStart: true,
      sniffInterval: 60000
	}
};
