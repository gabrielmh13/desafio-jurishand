import { inject, injectable } from "tsyringe";
import { IFilterArticlesDTO } from "../../dtos/IFilterArticlesDTO";
import { IArticlesRepository } from "../../repositories/IArticlesRepository";

@injectable()
export class ListAllArticlesUseCase {
    constructor(
        @inject("ArticlesRepository")
        private articlesRepository: IArticlesRepository
    ) { }

    async execute(filter: IFilterArticlesDTO) {
        const articles = await this.articlesRepository.findAll(filter)

        return articles
    }
}