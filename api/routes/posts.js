const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
var mongoose=require("mongoose");

//CREATE POST
router.post("/", async (req, res) => {
  console.log(req.body)
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  console.log("hehehehh",req.body);
  try {
    const post = await Post.findById({_id:mongoose.Types.ObjectId(req.params.id)});
    console.log("post is ",post )
    if (post.username === req.body.username) {
      // console.log("true")
      try {
        const updatedPost = await post.updateOne({_id:mongoose.Types.ObjectId(req.params.id)},
          {
            $set: req.body,
          },
          { new: true }
        );
        console.log("updated post",updatedPost);
        res.status(200).json(updatedPost);
      } catch (err) {
        console.log("error hjhbsjdbhjsdb", err)
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  console.log("req query"+req.query.user);
  console.log("body of reout get," +req.body.username);
  const username = req.query.user;
  const catName = req.query.cat;
  console.log("catnmae is "+catName);
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
      console.log("username is"+username);
    } else if (catName) {
      console.log("Catname in else is"+catName);
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
      console.log("inside else");
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
