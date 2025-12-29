// import { Request, Response } from "express";
// import { ArticleService } from "../services/article.service.js";
// import mongoose from "mongoose";

// export class ArticleController {
//   static async create(req: Request, res: Response) {
//     try {
//       const article = await ArticleService.create(req.body);
//       res.status(201).json(article);
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   static async getAll(req: Request, res: Response) {
//     try {
//       const articles = await ArticleService.getAll();
//       res.json(articles);
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   static async getById(req: Request, res: Response) {
//     try {
//       // Validate MongoDB ObjectId
//       if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//         return res.status(400).json({ error: "Invalid article ID format" });
//       }

//       const article = await ArticleService.getById(req.params.id);
//       if (!article) {
//         return res.status(404).json({ error: "Article not found" });
//       }
//       res.json(article);
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   static async update(req: Request, res: Response) {
//     try {
//       if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//         return res.status(400).json({ error: "Invalid article ID format" });
//       }

//       const article = await ArticleService.update(req.params.id, req.body);
//       if (!article) {
//         return res.status(404).json({ error: "Article not found" });
//       }
//       res.json(article);
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   static async delete(req: Request, res: Response) {
//     try {
//       if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//         return res.status(400).json({ error: "Invalid article ID format" });
//       }

//       const deleted = await ArticleService.delete(req.params.id);
//       if (!deleted) {
//         return res.status(404).json({ error: "Article not found" });
//       }
//       res.status(204).send();
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// }
