import "reflect-metadata";
import { ArticlesRepositoryInMemory } from "../../modules/artigos/repositories/in-memory/ArticlesRepositoryInMemory"
import { AppError } from "../../shared/errors/AppError";
import { UpdateArticleUseCase } from "../../modules/artigos/useCases/UpdateArticle/UpdateArticleUseCase";
import { ListAllArticlesUseCase } from "../../modules/artigos/useCases/ListAllArticles/ListAllArticlesUseCase";

describe('Update Article', () => {
    let articlesRepositoryInMemory = new ArticlesRepositoryInMemory()
    let updateArticleUseCase = new UpdateArticleUseCase(articlesRepositoryInMemory)
    let listAllArticlesUseCase = new ListAllArticlesUseCase(articlesRepositoryInMemory)

    it('Should be able to update an article', async () => {
        const updatedArticle = await updateArticleUseCase.execute(
            {
                author: "Gabriel Hernandes Update",
                title: "Código Penal",
                content: "Lei de Introdução ao...",
                category: "Penal"
            },
            1
        )

        expect(updatedArticle).toHaveProperty("id")
    })

    it('Should not be able to update a non-existent article', async () => {
        let updatedArticle
        let articles = await listAllArticlesUseCase.execute({
            order: "",
            category: "",
            keyword: ""
        })

        try {
            updatedArticle = await updateArticleUseCase.execute(
                {
                    author: "Gabriel Hernandes Update",
                    title: "Código Penal",
                    content: "Lei de Introdução ao...",
                    category: "Penal"
                },
                articles.length
            )
        } catch (err) {
            return expect(err).toBeInstanceOf(AppError)
        }

        expect(updatedArticle).not.toHaveProperty("id")
    })

})