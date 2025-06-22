const db = require('../models');
const BlogPost = db.BlogPost;

exports.getAllBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.findAll();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBlogPostById = async (req, res) => {
  try {
    const post = await BlogPost.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Article non trouvé' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Article non trouvé' });
    await post.update(req.body);
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Article non trouvé' });
    await post.destroy();
    res.json({ message: 'Article supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 