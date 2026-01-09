import { Type } from "@nestjs/common";
import { Query, Resolver, Args, Int, Mutation } from "@nestjs/graphql";
import { BaseService } from "../services/base.service";
import { PaginationArgs } from "../dto/pagination.args";
import { PaginationResponseDto } from "../dto/pagination-response.dto";
import { Paginated } from "../dto/paginated-result.gql";

export function BaseResolver<T extends Type<unknown>>(classRef: T): any {
    @Resolver({ isAbstract: true })
    abstract class BaseResolverHost {
        constructor(protected readonly service: BaseService<any>) { }

        @Query(() => [classRef], { name: `findAll${classRef.name}s` })
        async findAll(@Args() args: PaginationArgs): Promise<any[]> {
            const { skip, take, where: whereString, orderBy: orderByString, q } = args;

            const where = whereString ? JSON.parse(whereString) : {};
            const orderBy = orderByString ? JSON.parse(orderByString) : undefined;

            // Construir query compatible con BaseService.findAll
            // BaseService.findAll espera (query, additionalWhere, include)
            // Estamos adaptando los args de GQL al DTO BaseQueryDto del servicio
            const queryDto: any = {
                skip,
                take,
                q,
                // page, limit no se usan directamente si pasamos skip/take, 
                // pero BaseService calcula paginación basado en ellos si no se pasan skip/take
            };

            // Si orderBy está presente, algunos BaseService podrían no soportarlo dinámicamente sin cambios,
            // pero por ahora pasamos lo básico.

            const result = await this.service.findAll(queryDto, where);
            return result.data; // BaseResponseDto tiene { data, meta }
        }

        @Query(() => classRef, { name: `findOne${classRef.name}` })
        async findOne(@Args("id", { type: () => Int }) id: number): Promise<T> {
            const result = await this.service.findOne(id);
            return result.data as T;
        }

        @Mutation(() => classRef, { name: `remove${classRef.name}` })
        async remove(@Args("id", { type: () => Int }) id: number): Promise<any> {
            const result = await this.service.remove(id);
            return { id, ...result }; // Devuelve confirmación simple o el objeto si se modifica el servicio para devolverlo
        }

        // Aquí se pueden agregar create/update/restore/hardDelete
        // Para create/update se necesitarían DTOs específicos que son difíciles de generalizar sin mixins
        // Por ahora implementamos lectura y borrado básico.

        @Mutation(() => classRef, { name: `restore${classRef.name}` })
        async restore(@Args("id", { type: () => Int }) id: number): Promise<any> {
            const result = await this.service.restore(id);
            return result.data;
        }

        @Mutation(() => classRef, { name: `hardDelete${classRef.name}` })
        async hardDelete(@Args("id", { type: () => Int }) id: number): Promise<any> {
            return this.service.hardDelete(id);
        }
    }
    return BaseResolverHost;
}
