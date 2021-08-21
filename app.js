const express = require('express');
const bodyParser = require('body-parser')
var _ = require('lodash');
const app = express();


const text1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam luctus eros et egestas faucibus. Nullam scelerisque quis mi bibendum fringilla. Donec ut justo quis dolor porta tincidunt eget vel lectus. Integer condimentum ante vel efficitur dapibus. Proin ut porta tellus, sed rhoncus felis. Phasellus feugiat cursus nulla, non ultrices sem condimentum id. Nam eget ultricies tellus. Sed enim nunc, interdum in consequat in, finibus eget magna."

const https = require('https');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set('view engine', 'ejs');

var posts=[];
var posts_index=[];

app.get("/", function (req, res) {
    res.render('index',{text:text1,items:posts_index});
});


app.get("/posts/:newpostTitle",function(req,res){
    var postvar=req.params.newpostTitle;
    var temp=0;
    for(var i=0;i<posts.length;i++)
    {
        if(_.lowerCase(posts[i].label)===_.lowerCase(postvar)){
            res.render('Post',posts[i]);
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
        text: req.body.text,
        label: req.body.label
    };

    post_index={
        text: (req.body.text).substring(0,100)+"...",
        label: req.body.label
    };
    posts.push(post);
    posts_index.push(post_index);
    res.redirect("/")
})

app.listen(3000, function () {
    console.log("Running on port 3000");
})