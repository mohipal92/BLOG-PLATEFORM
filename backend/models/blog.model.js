import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Remove leading/trailing whitespace
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Technology",
        "Health",
        "Travel",
        "Food",
        "Education",
        "Lifestyle",
        "Finance",
        "Entertainment",
        "Sports",
        "Other",
      ],
      required: true,
    },

    photo: {
      type: String,
      default: "",
    },

    author: {
      type: mongoose.Schema.Types.ObjectId, // id of the user who created the blog
      ref: "User", // Reference to User model
      
    },

    likes: [ // array of user ids who liked the blog
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [ // array of comments(object ) in which each comment has user id and text,timestamp
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Blog = mongoose.model("Blog", blogSchema);
