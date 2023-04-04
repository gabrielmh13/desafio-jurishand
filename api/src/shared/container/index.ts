import { container } from "tsyringe";
import { ArticlesRepository } from "../../modules/artigos/infra/prisma/repositories/ArticlesRepository";
import { IArticlesRepository } from "../../modules/artigos/repositories/IArticlesRepository";

container.registerSingleton<IArticlesRepository>(
    "ArticlesRepository",
    ArticlesRepository
)