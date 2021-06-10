//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('19dffc7698384bba9b3b3eee5566c0dc');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
let newsdata = "";
let ct = "";
let search = "";
let detail;
app.set("view engine","ejs");
app.use(express.static("public"))

app.get("/",function(req,res){
  newsapi.v2.topHeadlines({
    category: ct,
    q: search,
    language: 'en',
    country: 'in'
  }).then(response => {
      newsdata = response;
      res.render("news",{newsdata:newsdata.articles,cate:ct,totalresult:newsdata.totalResults});
  });
});
app.get("/about",function(req,res){
  res.render("about");
})
app.get("/contact",function(req,res){
  res.render("contact");
})
app.post("/",function(req,res){
  ct = req.body.submit;
  search = req.body.search;
  res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
  console.log("START SERVER\nPORT : 3000");
})
