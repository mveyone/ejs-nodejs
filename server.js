const express=require('express');
const blogRoutes=require('./routes/blogRoutes');
const mongoose=require('mongoose');
const ejs=require('ejs');
const morgan=require('morgan');
const Blog=require('./models/blog');

//creating app
const app=express();

//connecting to db
mongoose.connect('mongodb://localhost/ninjago3',{useNewUrlParser: true},{useUnifiedTopology: true},()=>{
    console.log('connected to db!!!!');
});

//register view engine
app.set('view engine','ejs');

//setting port
app.listen(process.env.process || 5002,()=>{
    console.log('now listenning on Port 5002!!!');
});



// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.use(blogRoutes);
// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});