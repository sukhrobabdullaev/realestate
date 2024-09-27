import prisma from "../lib/prisma.js";

// Helper function to find a post by ID
const findPostById = async (id) => {
  return await prisma.post.findUnique({
    where: { id },
  });
};

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to get Posts" });
  }
};

// Get a single post by ID
const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await findPostById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Failed to get Post" });
  }
};

// Add a new post
const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body,
        userId: tokenUserId,
      },
    });

    res.status(200).json(newPost);
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ message: "Failed to add Post" });
  }
};

// Update an existing post
const updatePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const body = req.body;

  try {
    const post = await findPostById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the post belongs to the logged-in user
    if (post.userId !== tokenUserId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this post" });
    }

    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id },
      data: body,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Failed to update Post" });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await findPostById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the post belongs to the logged-in user
    if (post.userId !== tokenUserId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this post" });
    }

    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({ message: "Post deleted!" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Failed to delete Post" });
  }
};

export { getPost, getPosts, addPost, updatePost, deletePost };
