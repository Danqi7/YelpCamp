var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Cloud's Rest",
		image: "https://upload.wikimedia.org/wikipedia/commons/1/12/Cabin_Camp_3_PRWI.JPG",
		description: "Cloud's Rest is like heaven on the earth, the only campground that merits itself as one of the must-going places of interest.Newton came up with the law of gravity here. Einstain rekindled his love for nature here. Magic happens here everyday and you should make your own magic.",
	},
	{
		name: "Udacity reservoire",
		image: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Willesley_Scout_camp.jpg",
		description: "Udacity Campground is this new avantart high tech campgrounds. You can get a first-hand experience for a lot of cuttng edge technology here such as VR, Unmanded aircraft and even freeze your eggs if you are a female member.",
	},
	{
		name: "Madrid camp",
		image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Pinemere_Camp_grounds.jpg",
		description: "Hala Madrid! The name of Madrid camp is pretty much self-explanatory, that is if you are a Real Madrid fan, then you are more than welcome to join this camp. However, don't expect to be welcomed and well-cartered if you are a Barca fan. After all, they are rivals who hated each other to guts and this is how sport teams work. ",
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
		Campground.create(seed, function(err,campground){
			if (err){
				console.log(err);
			} else {
				console.log("added a campground");
				//create comments
				Comment.create({
						text: "This campground is awesome!",
						author: "Homer"
					}, function(err, comment){
						campground.comments.push(comment);
						campground.save();
						console.log("created campground");
				});
			}
		});
	});
}
module.exports = seedBD;
