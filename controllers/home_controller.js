const Post=require('../models/post');

const User=require('../models/user');

//populate the user of each post
module.exports.home=async function(req,res){

  try {

    let posts=await Post.find({})
    .sort('-createdAt')
   .populate('user')
   .populate({
    path:'comments',
    populate:{

        path:'user'
    }
   });




   let users=await User.find({})

    return res.render('home',{

        posts: posts,

        all_users:users
        
    });

    
  } catch (err) {
    
    console.log('error',err);

    return;
  }

   
  }

    



