const express = require('express');

// Create an express app
const app = express();

// Register '.mustache' extension with The Mustache Express
app.use(express.static('public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.listen(3001, () => {
	console.log('Example app listening on port 3000!');
});
