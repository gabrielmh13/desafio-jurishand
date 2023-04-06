import "reflect-metadata";
import { ArticlesRepositoryInMemory } from "../../modules/artigos/repositories/in-memory/ArticlesRepositoryInMemory"
import { AppError } from "../../shared/errors/AppError";
import { ListArticleByIdUseCase } from "../../modules/artigos/useCases/ListArticleById/ListArticleByIdUseCase";
import { ListAllArticlesUseCase } from "../../modules/artigos/useCases/ListAllArticles/ListAllArticlesUseCase";
import { IReturnArticlesDTO } from "modules/artigos/dtos/IReturnArticlesDTO";

describe('List Article By ID', () => {
    let articlesRepositoryInMemory = new ArticlesRepositoryInMemory()
    let listArticleByIdUseCase = new ListArticleByIdUseCase(articlesRepositoryInMemory)
    let listAllArticlesUseCase = new ListAllArticlesUseCase(articlesRepositoryInMemory)

    let articles: IReturnArticlesDTO[]

    beforeAll(async () => {
        articles = await listAllArticlesUseCase.execute({
            order: "",
            category: "",
            keyword: ""
        })
    })

    it('Should be able to list article by id', async () => {
        const article = await listArticleByIdUseCase.execute(articles[0].id)

        expect(article).toHaveProperty("id")
    })

    it('Should not be able to list a non-existent article', async () => {
        let article

        try {
            article = await listArticleByIdUseCase.execute(articles[articles.length - 1].id + 1)
        } catch (err) {
            return expect(err).toBeInstanceOf(AppError)
        }

        expect(article).not.toHaveProperty("id")
    })

})