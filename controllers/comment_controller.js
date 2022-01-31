const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=async function(req,res){

   try {

    let post=await Post.findById(req.body.post);

    if(post){

        let comment=await Comment.create({

            content:req.body.content,
            user:req.user._id,
            post:req.body.post
        });

        post.comments.push(comment);

        post.save();

        req.flash('success','Comment Created!!');

       return res.redirect('/');
    }

       
   } catch (err) {

    req.flash('error',err);


    console.log('error',err);
       
   }

}

module.exports.destroy=async function(req,res){

   try {
       
    let comment=await Comment.findById(req.params.id);

    if(comment.user==req.user.id){

        let postId=comment.post;

        comment.remove();

        let post=await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});

        req.flash('success','Comment deletd!!');

            return res.redirect('back');
        
    }else{

        req.flash('success','Can not delete comment!!');

        return res.redirect('back');
    }

   } catch (err) {

    req.flash('error',err);

    console.log('error',err);
       
   }

}