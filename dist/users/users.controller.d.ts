import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(data: Prisma.UserCreateInput): Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        passwordHash: string;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
        currency: string;
        buttonStyle: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findAll(): Prisma.PrismaPromise<{
        id: string;
        email: string;
        passwordHash: string;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
        currency: string;
        buttonStyle: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        passwordHash: string;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
        currency: string;
        buttonStyle: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: string, data: Prisma.UserUpdateInput): Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        passwordHash: string;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
        currency: string;
        buttonStyle: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    remove(id: string): Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        passwordHash: string;
        name: string | null;
        role: import("@prisma/client").$Enums.Role;
        currency: string;
        buttonStyle: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
