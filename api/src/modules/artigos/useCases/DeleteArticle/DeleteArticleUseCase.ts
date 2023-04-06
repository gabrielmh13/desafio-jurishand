import { AppError } from "../../../../shared/errors/AppError";
import { IArticlesRepository } from "../../../../modules/artigos/repositories/IArticlesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteArticleUseCase {
    constructor(
        @inject("ArticlesRepository")
        private articlesRepository: IArticlesRepository
    ) { }

    async execute(id: number) {
        const article = await this.articlesRepository.findArticleById(id)

        if (!article) {
            throw new AppError("Artigo não encontrado!", 400)
        }

        await this.articlesRepository.deleteArticleById(id)

        return
    }
}