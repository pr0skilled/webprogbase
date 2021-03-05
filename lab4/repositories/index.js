const { Pool } = require('pg');
const config = require('../config')

const pool = new Pool({
	connectionString: config.url,
	ssl: { rejectUnauthorized: false }
});

module.exports = {
	async query(text, params) {
		const start = Date.now();
		const res = pool.query(text, params);
		const duration = Date.now() - start;
		console.log('executed query', { text, duration, rows: res.rowCount });
		return res;
	},

	closeAll: () => pool.end()
};