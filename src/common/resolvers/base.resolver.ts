import { Type, UseGuards, UseFilters, Logger } from "@nestjs/common";
import { Query, Resolver, Args, Int, Mutation, InputType, Field } from "@nestjs/graphql";
import { BaseService } from "../services/base.service";
import { PaginationArgs } from "../dto/pagination.args";
import { GraphQLAuthGuard } from "../guards/graphql-auth.guard";

export interface BaseResolverOptions {
    createInput?: Type<any>;
    updateInput?: Type<any>;
    name?: string;
    isPublic?: boolean;
}

export function BaseResolver<T extends Type<unknown>>(
    classRef: T,
    options: BaseResolverOptions = {}
): any {
    const resourceName = options.name || classRef.name;
    const logger = new Logger(`${resourceName}Resolver`);

    @Resolver({ isAbstract: true })
    @UseGuards(...(options.isPublic ? [] : [GraphQLAuthGuard]))
    abstract class BaseResolverHost {
        constructor(protected readonly service: BaseService<any>) { }

        @Query(() => [classRef], { name: `findAll${resourceName}s` })
        async findAll(@Args() args: PaginationArgs): Promise<any[]> {
            const { skip, take, where: whereString, orderBy: orderByString, q } = args;

            let where = {};
            try {
                where = whereString ? JSON.parse(whereString) : {};
            } catch (e) {
                logger.error(`Error parsing where string for ${resourceName}: ${e.message}`);
                throw e;
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
                logger.warn(`${resourceName} with ID ${id} not found for findOne`);
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
            try {
                const record = await this.service.findOne(id, null, { includeDeleted: true });
                await this.service.hardDelete(id);
                return record.data;
            } catch (e) {
                logger.error(`Error hard deleting ${resourceName} with ID ${id}: ${e.message}`);
                throw e;
            }
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
