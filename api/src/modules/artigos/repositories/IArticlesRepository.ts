import { IFilterArticlesDTO } from "../dtos/IFilterArticlesDTO";
import { IReturnArticlesDTO } from "../dtos/IReturnArticlesDTO";

export interface IArticlesRepository {
    findAll(filter: IFilterArticlesDTO): Promise<IReturnArticlesDTO[]>
}