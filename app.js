var express = require("express");
var app = express();
var bodyParser = require("body-parser");



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

   var campgrounds = [
       {name:"NU camp", image:"http://www.totalescape.com/outside/wp-content/uploads/2013/02/DSCN0119.jpg"},
       {name:"Stanford camp", image:"http://www.active.com/Assets/Outdoors/Featured+Content/California-Camping-460.jpg"},
       {name:"JHU camp", image:"http://www.topeducationdegrees.org/wp-content/uploads/2014/05/49.-River-Way-Ranch-Camp-%E2%80%93-Sanger-California.jpg"}
       ]
    



app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
   //get data from form and add to campgrounds array
   //redirct to the campgrounds
   var name = req.body.name;
   var image = req.body.image;
   
   var newCampground = {name:name, image:image};
   campgrounds.push(newCampground);
   res.redirect("/campgrounds");
   console.log("POST ACTION!");
    
});

app.get("/campgrounds/new", function(req, res){
   
   res.render("new"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp has started!");
});