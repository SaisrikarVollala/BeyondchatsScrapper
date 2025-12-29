import { Schema, Document, model } from "mongoose";
import { getNextArticleId } from "./counter.model.js";

export type ContentBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string }
  | { type: "quote"; text: string }
  | { type: "image"; src: string; alt?: string };

const contentBlockSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["heading", "paragraph", "list", "quote", "image"],
    },
    level: { type: Number },
    text: { type: String },
    items: { type: String },
    src: { type: String },
    alt: { type: String },
  },
  { _id: false }
);

interface ArticleType extends Document {
  title: string;
  author: string;
  publishedDate: Date;
  articleId: number;
  category: string;
  likes: number;
  sourceUrl: string;
  contentBlocks: ContentBlock[];
  enhancedContent?: ContentBlock[];
}

const articleSchema = new Schema<ArticleType>(
  {
    title: { type: String, required: true },

    articleId: { type: Number, unique: true, index: true },

    author: { type: String, required: true },

    publishedDate: { type: Date, required: true },

    category: { type: String, required: true },

    likes: { type: Number, default: 0 },

    sourceUrl: {
      type: String,
      required: true,
      unique: true,
    },

    contentBlocks: {
      type: [contentBlockSchema],
      required: true,
    },

    enhancedContent: {
      type: [contentBlockSchema],
    },
  },
  { timestamps: true }
);

articleSchema.pre<ArticleType>("save", async function () {
  if (!this.isNew) return;

  try {
    this.articleId = await getNextArticleId();
  } catch (err) {
    throw err;
  }
});

export const Article = model<ArticleType>("Article", articleSchema);
