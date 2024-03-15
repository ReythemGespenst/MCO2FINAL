const mongoose = require('mongoose');
const databaseURL = "mongodb://localhost:27017/ReviewWebsite";
const options = {useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false };

mongoose.connect(databaseURL, options);

const userSchema = new mongoose.Schema({
		username: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		description: String, 
		userphoto: {
			type: String,
			required: true
		},
		isOwner: {
			type: Boolean,
			required: true
		}
}, {timestamps: true});

const userModel = mongoose.model("User", userSchema, "users");

exports.getCurrent = async function(id){
	try{
		const result = userModel.findById(id).exec();
		return result;
	}
	catch (err){
		console.error(err);
	}
}


exports.login = async function(param){
	try{
		const user = userModel.findOne(param);
		return user;
	}
	catch (err){
		console.error(err);
	}
}
