const express = require('express');
const morgan = require('morgan');
const mongoose =require('mongoose');
const Blog = require('./models/blog');
const { result } = require('lodash');
//express app
const app = express();
//connect to mongo db
const dbURI="mongodb+srv://ghosty:Divergent2003@cluster0.zgwlgfe.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true})
.then((result)=>app.listen(3000))
.catch((err)=>{
    console.log(err);
});
//register view engine
app.set('view engine','ejs');
//middleware and static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
//mongoose and mongo sandbox routes
app.get('/add-blog',(req,res)=>{
    const blog = new Blog({
        title:'new blog 2',
        snippet:'about my new Blog',
        body:'more about my new blog',
    });
    blog.save().then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    });
});
app.get('/all-blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(error);
    });
});
app.get('/single-blog',(req,res)=>{
    Blog.findById('64841ebc9ddca5ef7adb4da1')
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(error);
    });
});
//if we want express to look for files other than default view folder//
//app.set('views','myviews');
//listen for request 
//app.listen(3000);
//middleware
// app.use((req,res,next)=>{
//     console.log(req.hostname);
//     console.log(req.path);
//     console.log(req.url);
//     console.log(req.method);
//     next();
// });

//render a view
app.get('/',(req,res)=>{
res.redirect('/blogs');
});
app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt :-1})
    .then((result)=>{
        res.render('index',{title:'All Blogs ',blogs: result})
    })
    .catch((err)=>{console.log(err);});
});
app.post('/blogs',(req,res)=>{
console.log(req.body);
const blog = Blog(req.body);
blog.save()
.then((result)=>{
    res.redirect('/');
})
.catch((err)=>{
    console.log(err)
});
});

app.delete('/blogs/:id',(req,res)=>{
    Blog.findByIdAndDelete(req.params.id)
    .then((result)=>{
        res.json({redirect: '/blogs'});
    })
    .catch((err)=>{
        console.log(err);
    })
})

// app.get('/',(req,res)=>{
//     //res.send('<p>home page</p>');
//     res.sendFile('./views/index.html',{
//         root : __dirname,
//     });
// });
app.get('/blogs/create',(req,res)=>{
    console.log('hi');
    res.render('create',{title: 'New Blog'});
});
app.get('/blogs/:id', (req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(
        (result)=>{
            res.render('details',{title: 'Blog Details',blog: result})
        }
    )
    .catch((err)=>{
        console.log(err);
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{title: 'About'});
});

// app.get('/about',(req,res)=>{
//     //res.send('<p>about page</p>');
//     res.sendFile('./views/about.html',{
//         root : __dirname,
//     });
// });
//redirects
// app.get('/about-us',(req,res)=>{
//     res.redirect('./about');
// });
//404 page
// app.use((req,res)=>{
    //     res.statusCode=404;
    //     res.sendFile('./views/404.html',{
//         root: __dirname,
//     });
// });

app.use((req,res)=>{
    res.render('./404',{title: '404'});
});