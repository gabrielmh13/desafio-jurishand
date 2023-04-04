import { Request, Response } from "express";
import { container } from "tsyringe";
import { IFilterArticlesDTO } from "../../dtos/IFilterArticlesDTO";
import { ListAllArticlesUseCase } from "./ListAllArticlesUseCase";

export class ListAllArticlesController {
    async handle(req: Request, res: Response) {
        const filter: IFilterArticlesDTO = {
            order: req.query.order && ['asc', 'desc'].includes(req.query.order.toString().toLowerCase()) ? req.query.order.toString().toLowerCase() : 'asc',
            category: req.query.category ? req.query.category.toString() : "",
            keyword: req.query.keyword ? req.query.keyword.toString() : ""
        }

        const listAllArticlesUseCase = container.resolve(ListAllArticlesUseCase)

        const articles = await listAllArticlesUseCase.execute(filter)

        return res.json(articles)
    }
}