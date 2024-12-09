const Article = require('../models/Article');
const Category = require('../models/Categorie'); // Make sure Category is imported

// Get all articles
exports.getAllArticles = async (req, res) => {
    try {
      //console.log('Fetching all articles...');
      const articles = await Article.find().populate('category'); // Populate the associated categories
      //console.log('Articles fetched:', articles);
      res.json(articles);
    } catch (err) {
      console.error('Error fetching articles:', err);
      res.status(500).json({ error: err.message });
    }
};

// Get an article by ID
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('category');
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new article
// Create a new article
exports.createArticle = async (req, res) => {
  try {
    const { content } = req.body;

    // Validation du contenu
    if (content && Array.isArray(content)) {
      content.forEach((item) => {
        if (!item.type || !["text", "image"].includes(item.type)) {
          throw new Error("Type de contenu invalide.");
        }
        if (item.type === "text" && !item.content) {
          throw new Error("Le contenu texte est requis.");
        }
        if (item.type === "image" && !item.src) {
          throw new Error("L'URL de l'image est requise.");
        }
      });
    }

    const newArticle = new Article(req.body);
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Update an article
exports.updateArticle = async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedArticle) return res.status(404).json({ message: 'Article not found' });
    res.json(updatedArticle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an article
exports.deleteArticle = async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) return res.status(404).json({ message: 'Article not found' });
    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
