const express = require('express');
const bodyParser = require('body-parser')
var _ = require('lodash');
const app = express();


//MongoDB


const mongoose = require('mongoose');

const text1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam luctus eros et egestas faucibus. Nullam scelerisque quis mi bibendum fringilla. Donec ut justo quis dolor porta tincidunt eget vel lectus. Integer condimentum ante vel efficitur dapibus. Proin ut porta tellus, sed rhoncus felis. Phasellus feugiat cursus nulla, non ultrices sem condimentum id. Nam eget ultricies tellus. Sed enim nunc, interdum in consequat in, finibus eget magna."




mongoose.connect('mongodb+srv://admin:admin@clusterblogdb.j8jiw.mongodb.net/BlogDB');

const scheme= new mongoose.Schema({
    title: String,
    text: String
});

const Blog=mongoose.model('Blog_Post',scheme); //Here DataBase Name: Blog_Posts
// To enter Data to DataBase use Blog


const scheme_2= new mongoose.Schema({
    title: String,
    text_2: String
});

const HomeBlog={
    title: "Home",
    text: text1
};






//END MONGO
const Home_Blog=mongoose.model('Home_Blog_Post',scheme_2);


const https = require('https');
const { setFlagsFromString } = require('v8');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set('view engine', 'ejs');

var posts=[];
var posts_index=[];

app.get("/", function (req, res) {

    Home_Blog.find(function(err,results){
        if(err){
            console.log(err);
        }

        else{
            res.render('index',{text:text1,items:results});
        }
    });


   
});


app.get("/posts/:newpostTitle",function(req,res){
    var postvar=req.params.newpostTitle;
    var temp=0;
    Blog.find(function(err,results){
        if(err){
            console.log(err);
        }

        else{       
            

            for(var i=0;i<results.length;i++)
            {
                if(_.lowerCase(results[i].title)===_.lowerCase(postvar)){
                    res.render('Post',results[i]);
                    console.log("Match Found");
                    temp=1;
                    break;
            }

                else{
                    temp=0;
                }
            }

            if(temp==0){
            res.redirect("/");
            }
        }
    });
    
})

app.get("/about",function(req,res){
    res.render('about',{text:text1});
})

app.get("/contact",function(req,res){
    res.render('contact',{text:text1});
})

app.get("/compose",function(req,res){
    res.render('compose');
})


var post,post_index;
app.post("/compose",function(req,res){
    post={
        title: req.body.label,
        text: req.body.text
    };

    Blog.insertMany(post,function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("inserted New Item");
        }
    });

    post_index={
        title: req.body.label,
        text_2: (req.body.text).substring(0,100)+"..."
    };

    Home_Blog.insertMany(post_index,function(err){
        if(err){
            console.log(err);
        }

        else{
            console.log("Inserted New Item into Home Page Wala Blog Part");
        }
    });
    // posts.push(post);
    // posts_index.push(post_index);
    res.redirect("/")
});


app.get("/logout",function(req,res){
    
    res.redirect('/');
})

app.listen(3000, function () {
    console.log("Running on port 3000");
})