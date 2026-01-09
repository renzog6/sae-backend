import { Resolver, Query, Args } from "@nestjs/graphql";
import { PersonsService } from "./services/persons.service";
import { Person } from "./entities/person.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { PaginatedPerson } from "./dto/paginated-person.dto";
import { PaginationArgs } from "@common/dto/pagination.args";

@Resolver(() => Person)
export class PersonsResolver extends BaseResolver(Person) {
    constructor(private readonly personsService: PersonsService) {
        super(personsService);
    }

    @Query(() => PaginatedPerson, { name: 'findAllPersons' })
    async findAll(@Args() args: PaginationArgs): Promise<PaginatedPerson> {
        // Handle potential missing 'deleted' prop by casting or using defaults logic same as Employees
        const query = { ...args, deleted: 'exclude' } as any;
        const result = await this.personsService.findAll(query);
        return result as any;
    }
}
