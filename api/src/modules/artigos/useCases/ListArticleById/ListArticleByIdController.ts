import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListArticleByIdUseCase } from "./ListArticleByIdUseCase";

export class ListArticleByIdController {
    async handle(req: Request, res: Response) {
        const id = req.params.id

        let listArticleByIdUseCase = container.resolve(ListArticleByIdUseCase)

        const article = await listArticleByIdUseCase.execute(Number(id))

        return res.status(200).json(article)
    }
}