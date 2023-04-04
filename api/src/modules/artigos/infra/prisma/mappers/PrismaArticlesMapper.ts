import { artigos as RawArticles } from "@prisma/client";
import { IReturnArticlesDTO } from "../../../dtos/IReturnArticlesDTO";

export class PrismaArticlesMapper {
    static toDomain(raw: RawArticles): IReturnArticlesDTO {
        return {
            id: raw.id,
            author: raw.author,
            title: raw.title,
            content: raw.content,
            date: raw.date,
            category: raw.category
        }
    }
}