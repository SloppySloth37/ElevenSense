import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// import express from "express";
// import Post from "../models/Post.js";

// const router = express.Router();

router.post("/store", async (req, res) => {
  try {
    const articles = req.body; // raw scraped articles from Python

    if (!Array.isArray(articles)) {
      return res.status(400).json({ message: "Expected array of articles" });
    }

    // Convert scraped article → simple Post
    const posts = articles.map(a => ({
      title: a.title || "Untitled",
      url: a.url,
      image: a.images?.[0]?.source_url || "",   // pick first image
      tags: [a.domain || "news"]                 // small tags
    }));

    await Post.insertMany(posts, { ordered: false });

    res.json({
      message: "Feed posts saved!",
      count: posts.length
    });
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ message: "Failed to save feed posts" });
  }
});

export default router;

