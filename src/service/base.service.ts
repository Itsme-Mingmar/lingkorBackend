import { EntityTarget, Repository } from "typeorm";
import { AppDataSource } from "../config/psqlDb.config";


export abstract class BaseService<T extends { id: string }> {
    protected repository: Repository<T>;

    constructor(entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(entity);
    }
}