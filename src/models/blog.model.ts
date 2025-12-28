import {Schema, model} from 'mongoose';


export type ContentBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "image"; src: string };

const contentBlockSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["heading", "paragraph", "list", "quote", "image"],
    },
    level: { type: Number},
    text: { type: String },
    items: [{ type: String }],
    src: { type: String },
    alt: { type: String },
  },
  { _id: false } 
);

type ArticleType = {
    title: string;
    author: string;
    publishedDate: string;
    category: string;
    likes: number;
    sourceUrl: string;
    contentBlocks: ContentBlock[];
};

const articleSchema = new Schema<ArticleType>(
  {
    title: { type: String, required: true },

    author: { type: String, required: true },

    publishedDate: { type: String, required: true },

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
  },
  { timestamps: true }
);

export const Article = model<ArticleType>("Article", articleSchema);
