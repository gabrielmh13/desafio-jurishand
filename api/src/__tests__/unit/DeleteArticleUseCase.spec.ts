import "reflect-metadata";
import { ArticlesRepositoryInMemory } from "../../modules/artigos/repositories/in-memory/ArticlesRepositoryInMemory"
import { AppError } from "../../shared/errors/AppError";
import { DeleteArticleUseCase } from "../../modules/artigos/useCases/DeleteArticle/DeleteArticleUseCase";
import { CreateArticleUseCase } from "../../modules/artigos/useCases/CreateArticle/CreateArticleUseCase";

describe('Delete Article', () => {
    let articlesRepositoryInMemory = new ArticlesRepositoryInMemory()
    let createArticleUseCase = new CreateArticleUseCase(articlesRepositoryInMemory)
    let deleteArticleUseCase = new DeleteArticleUseCase(articlesRepositoryInMemory)
    let articleId: number

    beforeAll(async () => {
        const article = await createArticleUseCase.execute({
            author: "Gabriel Hernandes Delete",
            title: "Código Penal",
            content: "Lei de Introdução ao...",
            category: "Penal"
        })

        articleId = article.id
    })

    it('Should be able to delete article', async () => {
        const result = await deleteArticleUseCase.execute(articleId)

        expect(result).toBeUndefined()
    })

    it('Should not be able to delete a non-existent article', async () => {
        try {
            await deleteArticleUseCase.execute(articleId)
        } catch (err) {
            expect(err).toBeInstanceOf(AppError)
        }
    })


})