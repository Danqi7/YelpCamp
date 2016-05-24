var express = require("express");
    app = express();
    mongoose = require("mongoose");
    bodyParser = require("body-parser");
    Campground = require("./models/campground");
    Comment = require("./models/comment");
    seedDB = require("./seeds");



mongoose.connect("mongodb://localhost/yelp_camp");
app.set("port", (process.env.PORT || 5000));
seedDB();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, campgrounds){
        if (err){
            console.log(err);
        }else {
            console.log(campgrounds);
            res.render("campgrounds/campgrounds", {campgrounds:campgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
   //get data from form and add to campgrounds array
   //redirct to the campgrounds
   var name = req.body.name;
   var image = req.body.image;
   //create new campground and save it to DB
   var newCampground = {name:name, image:image};
   Campground.create(newCampground, function(err, campground) {
       if (err){
           console.log(err);
       }else {
           console.log("POST ACTION!");
           res.redirect("/campgrounds");
       }
   });


});

app.get("/campgrounds/new", function(req, res){
   	//res.render("landing")
	///res.send("what!");
	res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
		if (err){
			console.log("err");
			res.redirect("/campgrounds");
		}else {
			res.render("campgrounds/show", {camp: foundCamp});

		}
	});
});

app.get("/campgrounds/:id/comments/new", function(req, res){
	//find camp by id
	Campground.findById(req.params.id, function(err, camp){
		if (err){
			console.log(err);
		}else {
			res.render("comments/new", {camp:camp})
		}
	});
});

app.post("/campgrounds/:id/comments", function(req, res){
	Campground.findById(req.params.id, function(err, camp){
		if (err){
			console.log(err);
			res.redirect("/campgrounds");
		}else {
			Comment.create(req.body.comment, function(err, comment){
				if (err){
					console.log(err)
				}
				else{
					camp.comments.push(comment);
					camp.save();
                    console.log(camp);
					//res.send("YES!");
					res.redirect("/campgrounds/" + camp._id);
				}
			});
		}

	});
});

app.listen(app.get("port"), function(){
    console.log("YelpCamp has started at port: ", app.get("port"));
});
