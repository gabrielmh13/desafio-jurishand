import { AppError } from "../../../../shared/errors/AppError";
import { ICreateArticleDTO } from "../../../../modules/artigos/dtos/ICreateArticleDTO";
import { IArticlesRepository } from "../../../../modules/artigos/repositories/IArticlesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateArticleUseCase {
    constructor(
        @inject("ArticlesRepository")
        private articlesRepository: IArticlesRepository
    ) { }

    async execute(article: ICreateArticleDTO) {
        const existingArticle = await this.articlesRepository.findArticleByTitleAndAuthor(article.title, article.author)

        if (existingArticle) {
            throw new AppError("Artigo já existente", 409)
        }

        const newArticle = await this.articlesRepository.createArticle(article)

        return newArticle
    }
}