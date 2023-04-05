import { IFilterArticlesDTO } from "modules/artigos/dtos/IFilterArticlesDTO";
import { IReturnArticlesDTO } from "modules/artigos/dtos/IReturnArticlesDTO";
import { IArticlesRepository } from "../IArticlesRepository";

export class ArticlesRepositoryInMemory implements IArticlesRepository {
    private articles: IReturnArticlesDTO[] = [
        {
            id: 1,
            author: "Gabriel Hernandes",
            title: "Código Civil",
            content: "Lei de Introdução...",
            date: new Date("2023-04-01T22:22:14.000Z"),
            category: "Civil"
        },
        {
            id: 2,
            author: "Gabriel Hernandes",
            title: "Código Trabalhista",
            content: "Lei de Introdução ao...",
            date: new Date("2023-04-02T22:22:14.000Z"),
            category: "Trabalhista"
        },
        {
            id: 3,
            author: "Gabriel Hernandes",
            title: "Código Penal",
            content: "Lei de Introdução ao...",
            date: new Date("2023-04-03T22:22:14.000Z"),
            category: "Penal"
        },
    ]

    async findAll(filter: IFilterArticlesDTO): Promise<IReturnArticlesDTO[]> {
        let filteredArticles = this.articles;

        if (filter.keyword) {
            const keyword = filter.keyword.toLowerCase();
            filteredArticles = filteredArticles.filter(article =>
                article.title.toLowerCase().includes(keyword) || article.content.toLowerCase().includes(keyword)
            );
        }

        if (filter.category) {
            filteredArticles = filteredArticles.filter(article => article.category.toLowerCase() === filter.category.toLowerCase());
        }

        if (filter.order === "desc") {
            filteredArticles.reverse();
        }

        return filteredArticles;
    }
}