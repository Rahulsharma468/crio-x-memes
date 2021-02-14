//initialization and require of all elements
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Meme = require("./models/meme");
const methodOverride = require('method-override');
const path = require('path');
var dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, "./.env")}); 
const PORT = process.env.PORT;

// express app
const app = express();

//using method override for the put request
app.use(methodOverride('_method'));

// connect to mongodb & listen for requests
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  app.listen(PORT , () => {
    console.log('App is on ' + PORT);
  })
}).catch((err) => {
  console.log(err)
});

// register view engine 
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

function is_url(str)
{
  regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str))
        {
          return true;
        }
        else
        {
          return false;
        }
}

//api route to view all meme data 
//return the image at the specified url
app.get("/", (req, res) => {
  // Meme.find()
  //   .sort({ createdAt: -1 })
  //   .limit(100)
  //   .then((result) => {
  //     res.render("index", { memes: result, title: "All Memes" });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  Meme.find().sort({ createdAt:-1}).limit(100)
  .then((result)=>{
    res.render("index", { memes: result, title: "All Memes" });
      console.log('successfully fetched top 100 latest memes ');
      res.statusCode=200;
  }).catch((err)=>{
      console.log('failed to fetch all memes\n');
      console.log(err);
      res.statusCode=500;
  })
});

//api route to post and save the data to the database
app.post("/", (req, res) => {
  // const meme = new Meme({
  //   name: req.body.name ,
  //   url: req.body.url , 
  //   caption: req.body.caption
  // })
  // meme
  //   .save()
  //   .then((result) => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
    Meme.find(req.body)
    .then((meme)=>{
        if(meme.length>0){
            res.statusCode=409;
            res.json({message:'duplicate post not allowed'});
        }
        else{
            if(!is_url(req.body.url)){
                res.statusCode=404;
                res.json({message:'Enter valid url'});
            }
                  Meme.create(req.body)
                  .then((Meme)=>{
                      console.log('successfully uploaded meme\n');
                      res.statusCode=200;
                      res.redirect("/");
                  })
                  .catch((err)=>{
                      res.statusCode=500;
                      console.log(err);
                  });
        }
    }).catch((err)=>{
        res.statusCode=500;
        res.json({message:'error in find operation'});
        console.log(err);
    });
});



//get the specified post  to edit
app.get('/edit/:id' , (req,res) => {
  const id = req.params.id;
  Meme.findById(id)
    .then((result) => {
      res.statusCode=200;
      res.render('edit' , { 
      title: "Edit Meme"  , 
      name: result.name , 
      url: result.url ,
      caption: result.caption , 
      id: result.id
    })
    })
    .catch((err) => {
      res.statusCode=400;
      console.log(err);
    });
});

//route to edit the specified post
app.put('/edit/:id' , (req,res) => {
  Meme.findOne({
    _id: req.params.id
  })
  .then( meme => {
      //change new values 
      meme.caption =  req.body.caption , 
      meme.url =  req.body.url
      res.statusCode=200;
      meme.save()
      .then( meme => {
          res.redirect('/')
      })
  }).catch(err => {
    console.log(err);
  })
})

//api route to delete the post
app.get('/delete/:id' , (req,res) => {
  const id = req.params.id;
  Meme.findByIdAndDelete(id)
  .then(res.redirect('/'))
  .catch((err) => {
    res.statusCode=400;
    console.log(err);
  });
})

app.get('/edit' , (req,res) => {
  res.statusCode=200;
  res.render('edit' , {title: "Edit Meme" });
})

app.get("/memes", (req, res) => {
  Meme.find()
    .sort({ createdAt: -1 })
    .limit(100)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/memes", (req, res) => {
  const meme = new Meme({
    name: req.body.name,
    url: req.body.url,
    caption: req.body.caption,
  });
  meme
    .save()
    .then((result) => {
      res.json({
        id: result._id,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/memes/:id", (req, res) => {
  const id = req.params.id;
  Meme.findById(id)
    .then((result) => {
      res.json({
        id: result._id,
        name: result.name,
        url: result.url,
        caption: result.caption,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).render('404' , { title: "404" });
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});