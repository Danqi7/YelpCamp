var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

//set up a schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name:"NU camp", 
//         image:"http://www.totalescape.com/outside/wp-content/uploads/2013/02/DSCN0119.jpg"
//     },function(err, campground){
//         if (err){
//             console.log(err);
//         }else {
//             console.log("A NEW CAMPGROUND IS CREATED!");
//             console.log(campground);
//         }
//     });

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
            res.render("campgrounds", {campgrounds:campgrounds});
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
   
   res.render("new"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp has started!");
});