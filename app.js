let express=require('express');
let app=express();
app.use(express.static('public'));
let mongoose=require('mongoose');
let Post= require('./models/post.model').Post;
mongoose.connect('mongodb://127.0.0.1:27017/travels',{useNewUrlParser:true,useUnifiedTopology:true});
  
let cookieParser=require('cookie-parser');
let auth = require('./controllers/auth');

app.set('view engine', 'ejs');
let callbackRequestsRouter = require('./routes/callback-requests.route');
let multer =require('multer');
let postsRouter = require('./routes/posts.route');

let emailsRouter=require('./routes/emails.route');
let userRouter= require('./routes/users.route');
const { resolveInclude } = require('ejs');
app.use(express.json());
let imageStorage=multer.diskStorage({
    destination: (req,file,cb) =>cb(null,'public/images'),
    filename:(req,file,cb) =>cb(null,file.originalname)
})
app.use(multer({storage:imageStorage}).single('imageFile'));
app.use('/public/images',express.static('public/images'));
app.use('/posts', postsRouter);
app.use('/callback-requests', callbackRequestsRouter);
app.use('/emails/',emailsRouter);
app.use('/users', userRouter );

app.use(cookieParser());

app.get('/one', async(req,resp) => {
    let id= req.query.id;
    let post=await Post.findOne({id :id});
   resp.render('one', {
    title:post.title,
    imageUrl:post.imageUrl,
    date:post.date,
    text:post.text
   })
})

app.get('/admin',(req , resp) =>{
  let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)){
        resp.render('admin');
    }
    else{
        resp.redirect('/login');
    }
    
})


app.get('/login', (req , resp) => {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)){
        resp.redirect('/admin');
    }
    else{
        resp.render('login');
    }
    
})
app.listen(3000,() => console.log('Listening 3000...'));