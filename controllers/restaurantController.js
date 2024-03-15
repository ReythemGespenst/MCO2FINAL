const restoModel = require('../models/restaurant');
const userModel = require('../models/user');
const bodyparser = require('body-parser');

exports.getTop3 = async function(req, res) {
	try {
		const trend_restaurants = await restoModel.getTop3();
		const plain_trend_restaurants = trend_restaurants.map(doc=> doc.toObject());
		if(req.params.id){
			const user = await userModel.getCurrent(req.params.id);
			res.render('index', {h_user: user.username, img_url: user.userphoto, restaurants: plain_trend_restaurants, loggedIn: true, user_id: req.params.id});
		}
		else {
			res.render('index', {restaurants: plain_trend_restaurants, loggedIn: false});
		}	
	} catch(err){
		console.error(err);
	}
};

exports.loginpage = async function(req, res){
	try{
		res.render('login', {title: "Login Account"});
	}
	catch (err){
		console.error(err);
	}
};

exports.login = async function(req, res){
	try {
        const user = await userModel.login({username: req.body.username, password: req.body.password});
        console.log(user);
        if (user) {  
            console.log('logged in successfully');
            res.redirect("/logged/" + user._id); // this part will redirect the user to the main page
        } else {
            console.log('did not login successfully');
            res.render("login", { title: "Login Account", error: "Invalid username or password" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.viewProfile = async function(req, res){
	try{
		const user = await userModel.getCurrent(req.params.id);
		const reviews = await restoModel.getUserReviews(req.params.id2);
		const persontobeviewed = await userModel.getCurrent(req.params.id2);
		const dynamicHeight = 150.8 * reviews.length;
		console.log(reviews);
		res.render('profile', {ppic: persontobeviewed.userphoto, h_user: user.username, img_url: user.userphoto, fullname: persontobeviewed.name, blogs: reviews, loggedIn: true, v_user: persontobeviewed.username, numReviews: reviews.length, user_id: req.params.id});
	}
	catch (error){
		console.log(error);
		res.status(500).send("Internal Server Error")
	}
}

exports.viewResto = async function(req, res){
	try{
		const resto = await restoModel.getCurrent(req.params.id2);
		const reviews = resto.reviews.map(doc=> doc.toObject());
		const dynamicHeight = 150.8 * resto.reviews.length;
		console.log(req.params.id);
		console.log(resto.reviews);
		if(req.params.id){
			const user = await userModel.getCurrent(req.params.id);
			console.log(user);
			res.render('restaurant', {ppic: resto.images[0], h_user: user.username, blogs: reviews, loggedIn: false, numReviews: reviews.length, user_id: req.params.id});
		}
		else{
			res.render('restaurant', {ppic: resto.images[0], blogs: reviews, loggedIn: false, numReviews: reviews.length});
		}
	}
	catch (error){
		console.log(error);
		res.status(500).send("Internal Server Error")
	}
}