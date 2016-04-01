var fs = require('fs');

var path = '../public/JSONModels';
var dir = fs.readdirSync('../public/JSONModels');


dir.forEach(function (item) {
	fs.readdirSync(path + '/' + item).forEach(function (file) {
		var obj = JSON.parse(fs.readFileSync(path + '/' + item + '/' + file, 'utf8'));

		console.log(obj);

	});
})
