import { PrismaClient } from "@prisma/client";
import { client } from "../../../../../prisma/client";
import { IFilterArticlesDTO } from "../../../dtos/IFilterArticlesDTO";
import { IReturnArticlesDTO } from "../../../dtos/IReturnArticlesDTO";
import { IArticlesRepository } from "../../../repositories/IArticlesRepository";
import { PrismaArticlesMapper } from "../mappers/PrismaArticlesMapper";

export class ArticlesRepository implements IArticlesRepository {
    private repository: PrismaClient

    constructor() {
        this.repository = client
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

}