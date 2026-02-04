import { Type } from "@nestjs/common";
import { Query, Resolver, Args, Int, Mutation, InputType, Field } from "@nestjs/graphql";
import { BaseService } from "../services/base.service";
import { PaginationArgs } from "../dto/pagination.args";

export interface BaseResolverOptions {
    createInput?: Type<any>;
    updateInput?: Type<any>;
    name?: string;
}

export function BaseResolver<T extends Type<unknown>>(
    classRef: T,
    options: BaseResolverOptions = {}
): any {
    const resourceName = options.name || classRef.name;

    @Resolver({ isAbstract: true })
    abstract class BaseResolverHost {
        constructor(protected readonly service: BaseService<any>) { }

        @Query(() => [classRef], { name: `findAll${resourceName}s` })
        async findAll(@Args() args: PaginationArgs): Promise<any[]> {
            const { skip, take, where: whereString, orderBy: orderByString, q } = args;

            let where = {};
            try {
                where = whereString ? JSON.parse(whereString) : {};
            } catch (e) {
                console.error(`Error parsing where string for ${resourceName}:`, e);
            }

            const queryDto: any = {
                skip,
                take,
                q,
            };

            const result = await this.service.findAll(queryDto, where);
            return result.data;
        }

        @Query(() => classRef, { name: `findOne${resourceName}`, nullable: true })
        async findOne(@Args("id", { type: () => Int }) id: number): Promise<any> {
            try {
                const result = await this.service.findOne(id);
                return result.data;
            } catch (e) {
                return null;
            }
        }

        @Mutation(() => classRef, { name: `remove${resourceName}` })
        async remove(@Args("id", { type: () => Int }) id: number): Promise<any> {
            const result = await this.service.remove(id);
            return result.data;
        }

        @Mutation(() => classRef, { name: `restore${resourceName}` })
        async restore(@Args("id", { type: () => Int }) id: number): Promise<any> {
            const result = await this.service.restore(id);
            return result.data;
        }

        @Mutation(() => classRef, { name: `hardDelete${resourceName}`, nullable: true })
        async hardDelete(@Args("id", { type: () => Int }) id: number): Promise<any> {
            // baseService.hardDelete returns { message }, but GQL needs the object or ID
            // We'll return a partial with the ID if possible, but most schemas expect the full object
            // Let's try to find it first if we want to return the whole thing, 
            // but hard delete usually means it's gone. Returning a boolean or the ID is safer.
            // For now, let's keep it returning the object by finding it before deleting.
            const record = await this.service.findOne(id, null, { includeDeleted: true });
            await this.service.hardDelete(id);
            return record.data;
        }
    }

    // Dynamic Create Mutation
    if (options.createInput) {
        const createMutationName = `create${resourceName}`;
        Object.defineProperty(BaseResolverHost.prototype, createMutationName, {
            value: async function (input: any) {
                const result = await this.service.create(input);
                return result.data;
            },
            writable: true,
            configurable: true,
        });
        Mutation(() => classRef, { name: createMutationName })(
            BaseResolverHost.prototype,
            createMutationName,
            {
                value: [
                    Args("input", { type: () => options.createInput })
                ]
            }
        );
    }

    // Dynamic Update Mutation
    if (options.updateInput) {
        const updateMutationName = `update${resourceName}`;
        Object.defineProperty(BaseResolverHost.prototype, updateMutationName, {
            value: async function (id: number, input: any) {
                const result = await this.service.update(id, input);
                return result.data;
            },
            writable: true,
            configurable: true,
        });
        Mutation(() => classRef, { name: updateMutationName })(
            BaseResolverHost.prototype,
            updateMutationName,
            {
                value: [
                    Args("id", { type: () => Int }),
                    Args("input", { type: () => options.updateInput })
                ]
            }
        );
    }

    return BaseResolverHost;
}
