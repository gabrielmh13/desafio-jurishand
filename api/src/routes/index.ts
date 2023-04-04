import { Router } from "express";
import { ListAllArticlesController } from "../modules/artigos/useCases/ListAllArticles/ListAllArticlesController";

const articlesRoutes = Router()

const listAllArticlesController = new ListAllArticlesController

articlesRoutes.get('/artigos', listAllArticlesController.handle)

export { articlesRoutes }