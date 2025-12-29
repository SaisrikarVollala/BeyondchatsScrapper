import { Request, Response } from "express";
import { Article } from "../models/article.js";
import { get } from "node:http";


export class ArticleController {
  static async create(req: Request, res: Response) {
    try {
      const article = await Article.create( req.body);

      return res.status(201).json({
        success: true,
        data: article,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: (error as Error).message,
      });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const articles = await Article.find().sort({ articleId: -1 });

      return res.status(200).json({
        success: true,
        count: articles.length,
        data: articles,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  }

  static async getById(req: Request, res: Response) {
    const articleId = Number(req.params.id);

    if (Number.isNaN(articleId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid article ID",
      });
    }

    try {
      const article = await Article.findOne({ articleId });

      if (!article) {
        return res.status(404).json({
          success: false,
          message: "Article not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: article,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  }

  static async update(req: Request, res: Response) {
    const articleId = Number(req.params.id);

    if (Number.isNaN(articleId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid article ID",
      });
    }

    try {
      const article = await Article.findOneAndUpdate({ articleId }, req.body, {
        new: true,
      });

      if (!article) {
        return res.status(404).json({
          success: false,
          message: "Article not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: article,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: (error as Error).message,
      });
    }
  }

  static async delete(req: Request, res: Response) {
    const articleId = Number(req.params.id);

    if (Number.isNaN(articleId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid article ID",
      });
    }

    try {
      const article = await Article.findOneAndDelete({ articleId });

      if (!article) {
        return res.status(404).json({
          success: false,
          message: "Article not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Article deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    }
  }
}
