import { Request, Response } from "express";
import { ICreateArticleDTO } from "../../../../modules/artigos/dtos/ICreateArticleDTO";
import { container } from "tsyringe";
import { CreateArticleUseCase } from "./CreateArticleUseCase";
import { AppError } from "../../../../shared/errors/AppError";

export class CreateArticleController {
    async handle(req: Request, res: Response) {
        const { author, title, content, category }: ICreateArticleDTO = req.body

        if (!author || !title || !content || !category) {
            throw new AppError("Parâmetros em falta!", 400)
        }

        const createArticleUseCase = container.resolve(CreateArticleUseCase)

        const article = await createArticleUseCase.execute({
            author,
            title,
            category,
            content
        })

        return res.status(201).json(article)

    }
}