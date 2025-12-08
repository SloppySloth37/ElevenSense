// backend/script/load_event_ids.js
import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "../models/Post.js";

dotenv.config();

const PY_SERVICE = process.env.PY_ML_URL || "http://localhost:8000/event-id";

async function loadEventIDs() {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected.");

    // Fetch all posts that do NOT have event_id yet
    const posts = await Post.find({ event_id: null }, "url");
    console.log(`📌 Found ${posts.length} posts that need event IDs.`);

    let updated = 0;

    for (const post of posts) {
      if (!post.url) {
        console.log("⚠️  Post missing URL, skipping:", post._id);
        continue;
      }

      try {
        const res = await axios.post(PY_SERVICE, { url: post.url });
        const event_id = res.data.event_id ?? null;

        if (event_id !== null) {
          await Post.updateOne(
            { _id: post._id },
            { $set: { event_id } }
          );
          updated++;
        }
      } catch (err) {
        console.log(`⚠️  ML service failed for URL: ${post.url}`);
      }
    }

    console.log(`🎉 Updated ${updated} posts with event_id.`);
    process.exit(0);

  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

loadEventIDs();
