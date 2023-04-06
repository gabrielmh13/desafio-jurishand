import { ICreateArticleDTO } from "../dtos/ICreateArticleDTO";
import { IFilterArticlesDTO } from "../dtos/IFilterArticlesDTO";
import { IReturnArticlesDTO } from "../dtos/IReturnArticlesDTO";
import { IUpdateArticleDTO } from "../dtos/IUpdateArticleDTO";

export interface IArticlesRepository {
    createArticle(article: ICreateArticleDTO): Promise<IReturnArticlesDTO>
    findArticleByTitleAndAuthor(title: string, author: string): Promise<IReturnArticlesDTO | null>
    findArticleById(id: number): Promise<IReturnArticlesDTO | null>
    findAll(filter: IFilterArticlesDTO): Promise<IReturnArticlesDTO[]>
    deleteArticleById(id: number): Promise<void>
    UpdateArticleById(id: number, article: IUpdateArticleDTO): Promise<IReturnArticlesDTO>
}