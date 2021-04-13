
var axios = require('axios');
var mysql = require('mysql');
var Fs = require('fs');
var Path = require('path');
var ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var ffprobe = require('@ffprobe-installer/ffprobe').path;
var Ffmpeg = require('ffm');


Ffmpeg.setFfmpegPath(ffmpegPath);
Ffmpeg.setFfprobePath(ffprobe);

var regexYTB = /(?:http(?:s)?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'<> #]+)/gmi,
	regexFB = /^https?:\/\/www\.facebook\.com.*\/(video(s)?|watch|story)(\.php?|\/).+$/gm,
	regexhtml = /<div class="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6 mb-2">(.*?)<\/div>/gm,
	regexMP3 = /<div class="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-6 mb-2 mp3down">(.*?)<\/div>/gm,
	regexLinkYTB = /MP4 (114p|240p|360p|480p|720p|1080p)/gm;

var conn = mysql.createConnection({
	database: 'heroku_a56f8b931a7ed4a',
	host: "us-cdbr-east-03.cleardb.com",
	user: "b0cfb551f4b958",
	password: "23793918"
});
// mysql://b6b53dc6259796:e9dbf1d1@us-cdbr-east-03.cleardb.com/heroku_c3c31e660237b39?reconnect=true
conn.connect();

setInterval(function () {
    conn.query('SELECT 1');
}, 5000);

module.exports = {

	deleteIsErr: (callback) => {
		conn.query('SELECT url FROM videos WHERE isDone = 0', (err, result) => {
			if(result.length > 0) {
				Fs.rmdirSync(Path.resolve('public/images/thumbnails/' + result[0].url), { recursive: true });
				Fs.rmdirSync(Path.resolve('public/videos/' + result[0].url + '.mp4'), { recursive: true });
				Fs.rmdirSync(Path.resolve('public/sound/' + result[0].url + '.mp3'), { recursive: true });
				conn.query('DELETE FROM videos WHERE url = ?', result[0].url);
			}
			return callback('done');
		});
	},

	demo: (callback) => {
		conn.query('SELECT name,url,duration FROM videos WHERE isDone = 1 ORDER BY id DESC', (err, result) => {
			try{
				if(result.length > 8) {
					var getLastIndex = result.length - 1,
						last = result[getLastIndex];
					Fs.rmdirSync(Path.resolve('public/images/thumbnails/' + last.url), { recursive: true });
					Fs.rmdirSync(Path.resolve('public/videos/' + last.url + '.mp4'), { recursive: true });
					Fs.rmdirSync(Path.resolve('public/sound/' + last.url + '.mp3'), { recursive: true });

					conn.query('DELETE FROM videos WHERE url = ?', last.url, (err, result) => {
						return callback(true);
					});
				} else {
					callback(false, result);
				}
			} catch(err) {
				return callback(false, []);
			}
			
		});
	},

	dataVideo: (url, callback) => {
		Promise.all([
			new Promise((resolve, reject) => {
				conn.query('SELECT name,url,duration FROM videos', (err, result) => {
					resolve(result);
				});
			}),
			new Promise((resolve, reject) => {
				conn.query('SELECT * FROM videos WHERE url = ?', url, (err, result) => {
					resolve(result);
				});
			}),
			new Promise((resolve, reject) => {
				conn.query('SELECT * FROM comment WHERE url = ?', url, (err, result) => {
					resolve(result);
				})
			})
		]).then(([data1, data2, comment]) => {
			callback(data1, data2, comment);
		});
	},
	
	CheckLink : (link) => {
		var link = regexFB.exec(link) || regexYTB.exec(link);
	    regexYTB.lastIndex = 0;
	    regexFB.lastIndex = 0;

	    return link;
	},

	addComment: (body, callback) => {
		var data = {
			url: body.id,
			time: body.time,
			content: body.content
		};

		conn.query('INSERT INTO comment SET ?', data, callback);
	},

	getSound : (id, ms, mh, callback) => {
		axios.get(`https://e16.ytjar.info/grabber/mp3enginev9.php`, {
			params: {
				id: id,
				s: ms,
				h: mh
			}
		}).then(async respon => {

			const path = Path.resolve('public/sound/'+ id + '.mp3');
  			const writer = Fs.createWriteStream(path);

  			try{
  				const response = await axios({
					url: respon.data.link,
					method: 'GET',
					responseType: 'stream'
				});
				await response.data.pipe(writer);

				return callback('done', null);
  			} catch(err) {
  				console.log(err)
  				return callback(null, err);
  			}
			
		}).catch( error => {
			callback(null, error);
		});
	},

	getVideo : (id, callback) => {
		conn.query('SELECT source FROM videos WHERE url = ?',id,async function(error, result) {
			if(result[0].source) {
				const path = Path.resolve('public/videos/'+ id + '.mp4');
	  			const writer = Fs.createWriteStream(path);

	  			try{
	  				const response = await axios({
						url: result[0].source,
						method: 'GET',
						responseType: 'stream'
					});
					await response.data.pipe(writer);

					return callback('done', null);
	  			} catch(err) {
	  				console.log(err)
	  				return callback(null, err);
	  			}
			} else {
				return callback(null, error);
			}
		});
	},

	thumbnail: async (id, callback) => {
		try {let getTimeMark = (count) => {
	    	var array = [];
		    	for(let i = 1; i < count; i ++) {
		    		array.push(i);
		    	}
		    	return array;
	    }
	    
		
			conn.query('SELECT source,duration FROM videos WHERE url = ?', id, async function(error, result) {
		    	let array = await getTimeMark(Math.floor(result[0].duration));
		    	
		    		new Ffmpeg(result[0].source).thumbnail({
						    timestamps: array,
						    filename: '%s.png',
						    folder: Path.resolve(`public/images/thumbnails/${id}`),
						    size: '?x122'
						})
						.on('error', function(err, stdout, stderr) {
							callback(null, err);
						})
						.on('end', function() {
							conn.query('UPDATE videos SET isDone = ? WHERE url = ?', [1, id]);
					    	callback("done", null);
					  	});
			});
		} catch(err) {
			conn.query('DELETE FROM videos WHERE url = ?', id, function() {
				return callback(null, 'error when take screenshot');
			});
		}
	},

	youtube : (link, callback) => {
		var id = regexYTB.exec(link)[1];
		regexYTB.lastIndex = 0;

		axios(`SECRET_API/${id}`).then( respon => {
			var mh = /mh = '(.*)';/gm.exec(respon.data)[1],
				ms = /ms = '(.*)';/gm.exec(respon.data)[1],
				name = /<h1 itemprop="name" id="ytitle" class="mb-2">(.*?)<\/h1>/gm.exec(respon.data)[1];
				
			axios.get('SECRET_API',{
				params: {
					vid: id,
					s: ms, 
					h: mh,
					t: 'html',
					l: 1,
				}
			}).then(async html => {
				var arrayLinks = html.data.match(regexhtml),
					arrayResult = [],
					highQuality = "0",
					src = "";
				try{
					await arrayLinks.forEach((value, index, array) => {
						if(regexLinkYTB.test(value)) {
							regexLinkYTB.lastIndex = 0;

							arrayResult.push(value);

							var currentQuality = regexLinkYTB.exec(value)[1].replace('p','');
							regexLinkYTB.lastIndex = 0;

							if(currentQuality > highQuality && currentQuality <= "720") {
								src = value;
								highQuality = currentQuality;
							}
						};
					});
				} catch(err) {console.log(err); return callback(null, 'some thing error at step one') }

				await Ffmpeg.ffprobe(/href="(.*?)"/gm.exec(src)[1], async function(err, meta) {
					try{
						if(meta.format.duration > 240) return callback(null, {mess: 'this video is too long.'});
						var data = {duration: meta.format.duration, name: name, originLink: link, url: id, source: /href="(.*?)"/gm.exec(src)[1]};
						conn.query('INSERT INTO videos SET ?', data, function(error, results, fields) {
							if(error) return callback(null, error);
							callback({id: id, t: ms, tt: mh}, null);
						});
					} catch(err) {
						console.log(err)
						return callback(null, 'some thing error at step one');
					}
				});
				
			}).catch(error => {
				callback(null, error);
			});
		}).catch( error => {
			callback(null, error);
		});
	},

	facebook: (link, callback) => {

	},

	checkExist: (link, callback) => {
		conn.query('SELECT url FROM videos WHERE originLink = ?', link, callback);
	}
}
