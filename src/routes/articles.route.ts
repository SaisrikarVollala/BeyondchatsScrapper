import { Router } from "express";
import { ArticleController } from "../controllers/articles.controllers.js";
import storeToDB from "../scripts/storeToDB.js";

const router = Router();


router.post("/articles", ArticleController.create);
router.get("/articles", ArticleController.getAll);
router.get("/articles/:id", ArticleController.getById);
router.put("/articles/:id", ArticleController.update);
router.delete("/articles/:id", ArticleController.delete);
router.post("/storeToDB", storeToDB);

export default router;
