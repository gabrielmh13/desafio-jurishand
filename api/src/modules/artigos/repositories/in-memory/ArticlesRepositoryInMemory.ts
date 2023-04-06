import { IFilterArticlesDTO } from "modules/artigos/dtos/IFilterArticlesDTO";
import { IReturnArticlesDTO } from "modules/artigos/dtos/IReturnArticlesDTO";
import { IArticlesRepository } from "../IArticlesRepository";
import { ICreateArticleDTO } from "modules/artigos/dtos/ICreateArticleDTO";
import { IUpdateArticleDTO } from "modules/artigos/dtos/IUpdateArticleDTO";

export class ArticlesRepositoryInMemory implements IArticlesRepository {
    private articles: IReturnArticlesDTO[] = [
        {
            id: 0,
            author: "Gabriel Hernandes",
            title: "Código Civil",
            content: "Lei de Introdução...",
            date: new Date("2023-04-01T22:22:14.000Z"),
            category: "Civil"
        },
        {
            id: 1,
            author: "Gabriel Hernandes",
            title: "Código Trabalhista",
            content: "Lei de Introdução ao...",
            date: new Date("2023-04-02T22:22:14.000Z"),
            category: "Trabalhista"
        },
        {
            id: 2,
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

    async createArticle(article: ICreateArticleDTO): Promise<IReturnArticlesDTO> {
        const nextId = this.articles[this.articles.length - 1].id + 1;
        const newArticle: IReturnArticlesDTO = {
            id: nextId,
            author: article.author,
            title: article.title,
            content: article.content,
            date: new Date(),
            category: article.category,
        };
        this.articles.push(newArticle);
        return newArticle;
    }

    async findArticleByTitleAndAuthor(title: string, author: string): Promise<IReturnArticlesDTO | null> {
        const article = this.articles.find(
            (article) => article.title.toLowerCase() === title.toLowerCase() && article.author.toLowerCase() === author.toLowerCase()
        );
        return article || null;
    }

    async findArticleById(id: number): Promise<IReturnArticlesDTO | null> {
        const article = this.articles.find((article) => article.id === id);
        return article || null;
    }

    async deleteArticleById(id: number): Promise<void> {
        this.articles = this.articles.filter((article) => article.id !== id);
    }

    async UpdateArticleById(id: number, article: IUpdateArticleDTO): Promise<IReturnArticlesDTO> {
        const index = this.articles.findIndex((article) => article.id === id);

        if (index === -1) {
            throw new Error("Artigo não encontrado!");
        }

        const updatedArticle = {
            ...this.articles[index],
            ...article,
        };

        this.articles[index] = updatedArticle;

        return updatedArticle;
    }
}