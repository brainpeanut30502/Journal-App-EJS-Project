///////////////////////////////////EXPORTS//////////////////////////////////////////
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _= require("lodash");

///////////////////////////////////GLOBAL VARIABLES//////////////////////////////////////////

const homeStartingContent ="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, iure illum a perspiciatis quos deleniti expedita quas illo, numquam, maxime quod dicta tempora! Blanditiis sapiente eius ipsum rem facere magnam doloremque aspernatur obcaecati ea excepturi, neque temporibus mollitia laborum labore ipsa numquam error sed optio non quidem iste. Laboriosam excepturi, optio, commodi amet aut perspiciatis rem odio temporibus quod tenetur ex tempora praesentium doloremque ipsam ea ab quidem, quos dolor. Vero voluptatem facere ad magnam minima. Tempore ut cupiditate doloremque sequi officiis maiores iusto. Tenetur alias tempore ipsam expedita assumenda enim ratione repellat ut consequatur. Totam pariatur harum laborum cumque!";
const aboutContent ="Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus rem impedit voluptates adipisci asperiores, porro officiis vero iste quod voluptatibus corporis laudantium animi magni! Neque aliquam earum dignissimos aspernatur, porro necessitatibus, deleniti sit repellendus, illo ipsum delectus. Quia corporis dolores nihil ut consequuntur accusamus expedita. In aperiam perspiciatis quidem rerum, non laboriosam vero illo ducimus nostrum dicta saepe, fugit eaque blanditiis ut. Libero voluptas laboriosam sunt perspiciatis natus odit quia ex voluptates soluta reiciendis repellat odio fugit perferendis dignissimos culpa sed, harum accusantium nihil magni est quo molestiae minima sapiente quis. Aspernatur minus porro nesciunt enim iste delectus fugit deserunt?";
const contactContent ="Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, laborum inventore accusamus placeat quia consequuntur? Possimus sequi corporis iste magnam dicta numquam nihil, accusantium eligendi nemo consequatur. Earum aliquam officia natus deleniti qui minus facere perferendis, aperiam fugit fugiat consequatur obcaecati repellat illum quam! Illum quam praesentium aspernatur, sequi eligendi assumenda veniam aliquam dignissimos quis enim iste laborum! Qui ut dolores consectetur voluptatibus nemo perspiciatis molestiae consequuntur ratione deserunt rerum, maxime placeat voluptate odio voluptatem dicta non veniam porro vitae suscipit blanditiis ipsum alias ea dolore. Quia dolor facilis tempore veritatis reprehenderit corporis animi natus, voluptatibus culpa molestias at. Atque?";

let posts=[];
///////////////////////////////////APP SETUP//////////////////////////////////////////

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

///////////////////////////////////GET REQUESTS//////////////////////////////////////////
app.get("/",function(req,res){
  res.render("home",{homeStartingContent:homeStartingContent,posts:posts,});
});
app.get("/about",function(req,res){
  res.render("about",{aboutStartingContent:aboutContent,});
});
app.get("/contact",function(req,res){
  res.render("contact",{contactStartingContent:contactContent,});
});
app.get("/compose",function(req,res){
  res.render("compose");
});
app.get("/posts/:postName",function(req,res){
  var flag=0;
  var queryName=_.lowerCase(req.params.postName);
  var requiredPost;
  posts.forEach(function(post){
    if(_.lowerCase(post.postTitle)===queryName){
      requiredPost=post;
      flag=1;
    }
  })
  if(flag==1){
    console.log("Match Found!")
    res.render("post",{postTitle:requiredPost.postTitle,postTxt:requiredPost.postTxt,})
  }else{
    console.log("No Match found :(");
    res.send("<h1>Post Does Not Exists </h1>");
  }

})

///////////////////////////////////POST REQUESTS//////////////////////////////////////////

app.post("/compose",function(req,res){
  let post={
    postTitle:req.body.postTitle,
    postTxt:req.body.postTxt,
  };
  posts.push(post);
  res.redirect("/");
});



app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
