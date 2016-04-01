const express = require('express');
const router = express.Router();

function error() {

}

router.get('/', (req, res) => {
	// create a demo post, will later on fetch from db
	const post = {
		title: 'My first post ever'
	};
	// use array, assume we will return posts in the future
	res.json([post]);
});

router.post('/', (req, res) => {
	Post({
		title: req.body.title
	}).save()
	.then((err, post) => {
		res.send(post);
	});
});

module.exports = router;
