var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comments");
 
var data = [
    {
        title: "Cloud's Rest", 
        imageUrl: "https://www.mujerhoy.com/noticias/201804/23/media/cortadas/campamentos-de-verano-como-elegir-bien-kt7D-U501702292163jFE-560x420@MujerHoy.jpg",
        },
    {
        title: "Desert Mesa", 
        imageUrl: "https://www.mujerhoy.com/noticias/201804/23/media/cortadas/campamentos-de-verano-como-elegir-bien-kt7D-U501702292163jFE-560x420@MujerHoy.jpg",
        },
    {
        title: "Canyon Floor", 
        imageUrl: "https://www.mujerhoy.com/noticias/201804/23/media/cortadas/campamentos-de-verano-como-elegir-bien-kt7D-U501702292163jFE-560x420@MujerHoy.jpg",
	}
]
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        /*if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });*/
    }); 
    //add a few comments
}
 
module.exports = seedDB;