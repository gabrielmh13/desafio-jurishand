import { PrismaClient } from "@prisma/client";
import { client } from "../../../../../prisma/client";
import { IFilterArticlesDTO } from "../../../dtos/IFilterArticlesDTO";
import { IReturnArticlesDTO } from "../../../dtos/IReturnArticlesDTO";
import { IArticlesRepository } from "../../../repositories/IArticlesRepository";
import { PrismaArticlesMapper } from "../mappers/PrismaArticlesMapper";
import { ICreateArticleDTO } from "modules/artigos/dtos/ICreateArticleDTO";
import { IUpdateArticleDTO } from "modules/artigos/dtos/IUpdateArticleDTO";

export class ArticlesRepository implements IArticlesRepository {
    private repository: PrismaClient

    constructor() {
        this.repository = client
    }

    async createArticle(article: ICreateArticleDTO): Promise<IReturnArticlesDTO> {
        const rawArticle = await this.repository.artigos.create({
            data: {
                author: article.author,
                title: article.title,
                content: article.content,
                date: new Date(),
                category: article.category
            }
        })

        const newArticle = PrismaArticlesMapper.toDomain(rawArticle)

        return newArticle
    }

    async findArticleById(id: number): Promise<IReturnArticlesDTO | null> {
        const rawArticle = await this.repository.artigos.findFirst({
            where: {
                id
            }
        })

        if (!rawArticle) {
            return null
        }

        const article = PrismaArticlesMapper.toDomain(rawArticle)

        return article
    }

    async findArticleByTitleAndAuthor(title: string, author: string): Promise<IReturnArticlesDTO | null> {
        const rawArticle = await this.repository.artigos.findFirst({
            where: {
                title,
                author
            }
        })

        if (!rawArticle) {
            return null
        }

        const article = PrismaArticlesMapper.toDomain(rawArticle)

        return article
    }

    async findAll(filter: IFilterArticlesDTO): Promise<IReturnArticlesDTO[]> {
        const rawArticles = await this.repository.artigos.findMany({
            where: {
                category: {
                    contains: filter.category
                },
                AND: {
                    OR: [
                        {
                            title: {
                                contains: filter.keyword
                            }
                        },
                        {
                            content: {
                                contains: filter.keyword
                            }
                        }
                    ]
                }
            },
            // @ts-expect-error
            orderBy: {
                date: filter.order
            },
        })

        const articles = rawArticles.map(rawArticle => {
            return PrismaArticlesMapper.toDomain(rawArticle)
        })


        return articles
    }

    async deleteArticleById(id: number): Promise<void> {
        const rawArticle = await this.repository.artigos.findFirst({
            where: {
                id
            }
        })

        if (!rawArticle) {
            return
        }

        await this.repository.artigos.delete({
            where: {
                id
            }
        })
    }

    async UpdateArticleById(id: number, article: IUpdateArticleDTO): Promise<IReturnArticlesDTO> {
        const rawArticle = await this.repository.artigos.update({
            where: {
                id
            },
            data: article
        })

        const updatedArticle = PrismaArticlesMapper.toDomain(rawArticle)

        return updatedArticle
    }

}