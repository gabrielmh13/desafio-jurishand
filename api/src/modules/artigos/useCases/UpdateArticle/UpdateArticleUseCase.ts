import { AppError } from "../../../../shared/errors/AppError";
import { IArticlesRepository } from "../../../../modules/artigos/repositories/IArticlesRepository";
import { inject, injectable } from "tsyringe";
import { IUpdateArticleDTO } from "../../../../modules/artigos/dtos/IUpdateArticleDTO";

@injectable()
export class UpdateArticleUseCase {
    constructor(
        @inject("ArticlesRepository")
        private articlesRepository: IArticlesRepository
    ) { }

    async execute(article: IUpdateArticleDTO, id: number) {
        const existingArticle = await this.articlesRepository.findArticleById(id)

        if (!existingArticle) {
            throw new AppError("Artigo não encontrado!", 400)
        }

        const updatedArticle = this.articlesRepository.UpdateArticleById(id, article)

        return updatedArticle
    }
}