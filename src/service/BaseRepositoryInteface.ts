export interface BaseRepositoryInteface<T>{
    find(user: string) : Promise<T>
    create(item: T): Promise<T>
    update(id: number, item: T): Promise<boolean>
    delete(id: number): Promise<boolean>
    findAll(page?: number) : Promise<T[]>
}