var mongoose = require("mongoose");
var Campground = require("./models/campground");

var data = [
	{
		name: "Cloud's Rest",
		image: "https://upload.wikimedia.org/wikipedia/commons/1/12/Cabin_Camp_3_PRWI.JPG",
		description: "This is a nice awesome ass-kicking campground",
	},
	{
		name: "Udacity reservoire",
		image: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Willesley_Scout_camp.jpg",
		description: "Udacity is cool!",
	},
	{
		name: "Madrid camp",
		image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Pinemere_Camp_grounds.jpg",
		description: "Hala Madrid!",
	},

]

function seedBD(){
	//remove all campgrounds
	Campground.remove({}, function(err){
		if (err){
			console.log(err);
		} else{
			console.log("removed campgrounds!");
		}
	});
	data.forEach(function(seed){
		Campground.create(seed, function(err,data){
			if (err){
				console.log(err);
			} else {
				console.log("added a campground");
			}
		});	
	});
}
module.exports = seedBD;
