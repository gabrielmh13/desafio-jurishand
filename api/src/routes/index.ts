import { Router } from "express";
import { ListAllArticlesController } from "../modules/artigos/useCases/ListAllArticles/ListAllArticlesController";
import { CreateArticleController } from "../modules/artigos/useCases/CreateArticle/CreateArticleController";
import { DeleteArticleController } from "../modules/artigos/useCases/DeleteArticle/DeleteArticleController";
import { UpdateArticleController } from "../modules/artigos/useCases/UpdateArticle/UpdateArticleController";
import { ListArticleByIdController } from "../modules/artigos/useCases/ListArticleById/ListArticleByIdController";


const articlesRoutes = Router()

const listAllArticlesController = new ListAllArticlesController()
const listArticleByIdController = new ListArticleByIdController()
const createArticleController = new CreateArticleController()
const deleteArticleController = new DeleteArticleController()
const updateArticleController = new UpdateArticleController()

articlesRoutes.get('/artigos', listAllArticlesController.handle)
articlesRoutes.get('/artigos/:id', listArticleByIdController.handle)
articlesRoutes.post('/artigos', createArticleController.handle)
articlesRoutes.delete('/artigos/:id', deleteArticleController.handle)
articlesRoutes.put('/artigos/:id', updateArticleController.handle)

export { articlesRoutes }