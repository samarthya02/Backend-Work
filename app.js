const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
mongoose.connect("mongodb://localhost:27017/WeeklyDB" , {useNewUrlParser : true});
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine" , "ejs");
app.use(express.static("public"));


const articleSchema = {
    title : String , 
    article : String
}

const Article  = mongoose.model("article" , articleSchema);

app.route("/articles")
    .get(function(req , res){
    Article.find({} , function(err, result){
        if(!err){
            res.send(result);
        }
    })})
    
    .post(function(req , res){
        const title  = req.body.title ; 
        const content = req.body.content ;
        const article = new Article({
            title : title,
            article : content
        })
        article.save(function(err){
            if(!err){
                res.send("success")
            }
        });

    })
        
    .delete(function(req,res){
            Article.deleteMany(
                {} , function(err){
                    if(!err){
                        res.send("deleted all the items")
                    }
                }
            )
        });


app.route("/articles/:name")
 .get(function(req,res){

     Article.find({title : req.params.name} , function(err , data){
         if(!err){
             res.send(data);
         }else{
             res.send(err);
         }
     })
 })
 .put(function(req ,res){
     Article.update({title : req.params.name} , {title : req.body.title , article : req.body.content} , {overwrite : true} , function(err){
         if(!err){
             res.send("success");
         }
     })
 });
    
    

    







app.listen(3000 , function(){
    console.log("server started at 3000....")
});