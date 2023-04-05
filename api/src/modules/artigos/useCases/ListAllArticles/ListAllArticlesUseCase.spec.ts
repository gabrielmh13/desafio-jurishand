import "reflect-metadata";
import { ArticlesRepositoryInMemory } from "../../repositories/in-memory/ArticlesRepositoryInMemory";
import { ListAllArticlesUseCase } from "./ListAllArticlesUseCase";

describe('List Articles', () => {

    let articlesRepositoryInMemory = new ArticlesRepositoryInMemory()
    let listAllArticlesUseCase = new ListAllArticlesUseCase(articlesRepositoryInMemory)

    it('Should be able to return all articles in asc order', async () => {
        const result = await listAllArticlesUseCase.execute({
            order: "",
            category: "",
            keyword: ""
        })

        expect(result).toHaveLength(3)
    })

    it('Should be able to return all articles in desc order', async () => {
        const result = await listAllArticlesUseCase.execute({
            order: "desc",
            category: "",
            keyword: ""
        })

        expect(result).toHaveLength(3)
        expect(result[0]).toHaveProperty('id', 3)
    })

    it("Should be able to return only one article filtered by category", async () => {
        const result = await listAllArticlesUseCase.execute({
            order: "",
            category: "Penal",
            keyword: ""
        })

        expect(result).toHaveLength(1)
    })

    it("Should be able to return only two articles filtered by keyword", async () => {
        const result = await listAllArticlesUseCase.execute({
            order: "",
            category: "",
            keyword: "ao"
        })

        expect(result).toHaveLength(2)
    })
})