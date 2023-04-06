import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteArticleUseCase } from "./DeleteArticleUseCase";


export class DeleteArticleController {
    async handle(req: Request, res: Response) {
        const id = req.params.id

        let deleteArticleUseCase = container.resolve(DeleteArticleUseCase)

        await deleteArticleUseCase.execute(Number(id))

        return res.status(200).json({ message: "Artigo deletado com sucesso!" })

    }
}