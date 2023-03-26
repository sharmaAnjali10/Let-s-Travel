let uniqid = require('uniqid');
let Post = require('../models/post.model').Post;
let express = require('express');
let router = express.Router(); //redirecting files from one to another..

let authMiddleware = require('../middleware/auth');




router.get('/',async (req,resp) =>{
    let posts = await Post.find();
    resp.send(posts);
})
router.get('/:id',async (req,resp) =>{
    let id = req.params.id;
    let post = await Post.findOne({id: id});
    resp.send(post); 
})

router.post('/',authMiddleware,async (req,resp) =>{
    let reqBody=req.body;
    let imgPath;
   if(reqBody.imageUrl){
    imgPath=reqBody.imageUrl;
   }
   else{
    imgPath=req.file.path.substring(req.file.path.indexOf('/'),req.file.path.length);
   }
    let newPost=new Post({
        id:uniqid(),
        title:reqBody.title,
        date:new Date(),
        description:reqBody.description,
        text:reqBody.text,
        country:reqBody.country,
        imageUrl:imgPath
    })
    await newPost.save();
    // console.log(req.file);
    resp.send('Created');
    // resp.send(posts);
})
// Post1.save().then(() => console.log('This is saved'));

router.delete('/:id', authMiddleware,async (req,resp)  => {
    let id = req.params.id;
    await Post.deleteOne({id: id});
    resp.send('Deleted');
})
router.put('/:id', authMiddleware,async (req,resp) => {
    let id = req.params.id;
    await Post.updateOne({id: id}, req.body);
    resp.send('updated...');
})
module.exports = router;