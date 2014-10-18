var express = require('express'),
	cors = require('cors'),
	session = require('express-session'),
	passport = require('passport'),
	github = require('github'),
	request = require('request'),
	passportGithub = require('passport-github'),
	GithubStrategy = require('passport-github').Strategy,
	port = 9007,
	app = express(),
	user = {};


// var User = function (id, name) {
// 	this.id = id;
// 	this.name = name;
// };

// User.prototype.findOrCreate = function(userObj, cb){
// 	for (var i = users.length - 1; i >= 0; i--) {
// 		if(userObj.id === users[i]){
// 			return cb(userObj);
// 		} 
// 	};
// 	users.push(new User(userObj.id, userObj.name));
// 	return cb(userObj);
// }



app.use(express.static(__dirname + '/public'));
app.use(session({secret: 'imaCoder'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GithubStrategy({
		clientID: '6f8444cbf25af8b3ec3d',
		clientSecret: 'a2cb8cc72ca09856cef18744f82d28291a7e3346',
		callbackURL: 'http://localhost:9007/auth/github/callback'
	},
	function(accessToken, refreshToken, profile, done) {
		user = profile;
		user.accessToken = accessToken;
		user.refreshToken = refreshToken;
		return done(null, profile);
	}
));

function requireAuth(req, res, next){
	if(!req.isAuthenticated()) {
		res.status(403).end();
	}
	return next();
};

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github',
	{
		successRedirect: '/#/home',
		failureRedirect: '/#/login'
	}), function(req, res){
		console.log(req.session);
	}
);

app.get('/api/github/following', function(req, res){
	request({url: "https://api.github.com/users/" + user.username + "/followers?client_id=6f8444cbf25af8b3ec3d&client_secret=a2cb8cc72ca09856cef18744f82d28291a7e3346", headers: {"User-Agent":user.username}, params: user.accessToken}, function(error, response, body) {
		res.status(200).send(body);
	});
});

app.get('/user',  function(req, res){
	res.status(200).send(JSON.stringify(user));
});

app.get('/api/github/:username/activity', function(req, res){
	request({url: "https://api.github.com/users/" + req.params.username + "/events", headers: {"User-Agent":user.username}, params: user.accessToken}, function(error, response, body) {
		res.status(200).send(body);
	});
})

app.listen(port, function(){
	console.log('Listening on port ' + port);
});