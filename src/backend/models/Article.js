const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  excerpt: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
  featuredImage: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  content: [
    {
      type: { type: String, enum: ['text', 'image'], required: true },
      content: String,   // For text content
      src: String,       // For image content
    },
  ],
  tags: [String],
  updatedAt: Date,
  publishedAt: Date,
  isPublished: Boolean,
  allowComments: Boolean,
  likes: { type: Number, default: 0 },
  shareCount: { type: Number, default: 0 },
  price: { type: Number, default: 0 },  // Free or paid
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
