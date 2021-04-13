var express = require('express');
var router = express.Router();
var path = require('path');
var helper = require('../helper/getVideo');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {	
	
	helper.demo((err, result) => {
		if(err) return res.redirect(req.originalUrl);
		res.render('index', { data: result, player: {}, comment: []});
	});
});

router.post('/dv', function(req, res) {
	helper.deleteIsErr(() => {
		res.send({dl: 'done'});
	});
});


router.get('/:id', async function(req, res) {
	helper.dataVideo(req.params.id, (err, result, comment) => {
		if(result[0])
			return res.render('index', {data: err, player: result[0], comment: comment});
		else 
			return res.render('error');
	})
	
});
	
	function StepOne(req, res) {
		helper.checkExist(req.body.link, (error, result) => {
			
			if(result[0]) return res.send({redir: result[0].url});

			if(helper.CheckLink(req.body.link) && req.body.link.match('youtube')) {
				helper.youtube(req.body.link, (result, error) => {
					res.send({data: result, error: error});
				});
			} else if(helper.CheckLink(req.body.link) && req.body.link.match('facebook')) {
				helper.facebook(req.body.link, (result, error) => {
					res.send({data: result, error: error});
				});
			} else {
				res.send({error: `this ${req.body.link} is not correct, please try again!`})
			}
		})
	}

	function StepTwo(req, res) {
		// get sound here
		
		var id = req.body.id,
			ms = req.body.t,s
			mh = req.body.tt; 
		if(id && ms && mh) {
			helper.getSound(id, ms, mh, (result, er) => {
				res.send({step2: result, error: er});
			});
		} else
			return res.send({step2: 0, error: 'something unsual happened.'})
	}

	function StepThree(req, res) {
		if(req.body.id) {
			helper.getVideo(req.body.id, (result, error) => {
				res.send({data: result, step3: 1, error: error});
			});
		} else {
			res.send({step3: 0, error: error});
		}
	}

	function StepFour(req, res) {

		res.setHeader('Connection', 'Transfer-Encoding');
	    res.setHeader('Content-Type', 'text/html; charset=utf-8');
	    res.setHeader('Transfer-Encoding', 'chunked');
	    res.setHeader('X-Content-Type-Options', 'nosniff');

	    helper.thumbnail(req.body.id, (data, error) => {
	    	res.send({data: 'done', error: error});
	    });

	}

router.post('/action', function(req, res) {	

	if(req.body.step == 1) return StepOne(req, res); // verifying and get link video
	if(req.body.step == 2) return StepTwo(req, res); // get sound
	if(req.body.step == 3) return StepThree(req, res); // get video
	if(req.body.step == 4) return StepFour(req, res); // Generating thumbnail

});

router.post('/postComment', (req, res) => {
	helper.addComment(req.body, (err, result) => {
		res.send('done');
	});
});


 //https://www.genyt.net/getLinks.php?vid=YykjpeuMNEk&s=1616472441&h=1e9147e8c5e887b1bc911c550b78f439&t=html&l=1


module.exports = router;