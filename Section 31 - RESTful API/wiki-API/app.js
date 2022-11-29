const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
    title : String,
    content : String
}

const Article = mongoose.model("Article", articleSchema);

//TODO
// All articles
app.route("/articles")

.get(function(req, res)
{
    Article.find(function(err, foundArticle)
    {
      if(!err){
        res.send(foundArticle);
      }
      else 
      {
        res.send(err);
      }
    });
})

.post(function(req, res)
{

  // console.log(req.query.title);

  const newarticle = new Article({
    title : req.query.title,
    content : req.query.content
  });

  newarticle.save(function(err)
  {
    if (err)
    {
      res.send(err);
    }
    else
    {
      res.send("Sucess");
    }
  });

})

.delete(function(req, res)
{
  Article.deleteMany(
    function(err)
    {
      if(err)
      {
        res.send(err);
      }
      else
      {
        res.send("sucess");
      }
    }
  );
});

// app.get("/articles", );

// app.post("/articles", );

// app.delete("/articles", );




//specific articles

app.route("/articles/:articleTitle")

.get(function(req, res)
{
  articleTitle = req.params.articleTitle;

  Article.findOne({title : articleTitle}, function(err, foundArticle)
  {
    if(err)
    {
      res.send(err);
    }
    else{
      if(foundArticle)
      {
        res.send(foundArticle);
      }
      else{
        res.send("no articles matching");
      }
    }
  });
})

.delete(function(req, res)
{
  articleTitle = req.params.articleTitle;

  Article.deleteOne(
    {title: articleTitle},
    function(err)
    {
      if(!err)
      {
        res.send("sucess");
      }
    }
  );

})

.put(function(req, res)
{
  articleTitle = req.params.articleTitle;
  Article.updateOne(
    {title : articleTitle},
    {title : req.query.title, content : req.query.content},
    {overwrite : true},
    function(err)
    {
      if(!err)
      {
        res.send("sucess");
      }
    } 
  );

});




app.get("/", function(req, res)
{
    res.send("test");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});



