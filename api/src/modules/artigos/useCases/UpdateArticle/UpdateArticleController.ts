import { Request, Response } from "express";
import { IUpdateArticleDTO } from "../../../../modules/artigos/dtos/IUpdateArticleDTO";
import { container } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { UpdateArticleUseCase } from "./UpdateArticleUseCase";

export class UpdateArticleController {
    async handle(req: Request, res: Response) {
        const id = req.params.id
        const { author, title, content, category }: IUpdateArticleDTO = req.body

        if (!author || !title || !content || !category) {
            throw new AppError("Parâmetros em falta!", 400)
        }

        const updateArticleUseCase = container.resolve(UpdateArticleUseCase)

        const updatedArticle = await updateArticleUseCase.execute(
            {
                author,
                title,
                content,
                category
            },
            Number(id)
        )

        return res.status(200).json(updatedArticle)

    }
}