import { BaseRepositoryInteface } from "./BaseRepositoryInteface";
import { PrismaClient } from "@prisma/client";


export abstract class BaseRepository<T> implements BaseRepositoryInteface<T>{
    private readonly _prisma: any;
    private readonly prisma : PrismaClient = new PrismaClient();


    constructor(key: string) {
        this._prisma = this.prisma[key as keyof typeof this.prisma]
    }


    create(item: T): Promise<T> {
        return this._prisma.create({
            data: item
        })
    }

    update(_id: number, item: T): Promise<boolean> {
        return this._prisma.update({
            where: {
                id: _id
            },
            data: {
                ...item
            }
        })
    }

    delete(_id: number): Promise<boolean> {
        return this._prisma.delete({
            where: {
                id: _id,
            },
        })
    }

    find(user: string): Promise<T> {
        return this._prisma.findUnique(
            {
                where:
                {
                    user: user
                }
            }
        );

    }

    findAll(page?: number): Promise<T[]> {
        let p = page || 0;
        let take = 5;
        let skip = p * take;
        return this._prisma.findMany({
            skip: skip,
            take: take
        });
    }

    destroy() {
        this.prisma.$disconnect()
    }
} 