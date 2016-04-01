const mongo = require('mongoskin');
const db = mongo.db("mongodb://localhost:27017/testappfero",
	{ native_parser: true });

exports.module = db;
