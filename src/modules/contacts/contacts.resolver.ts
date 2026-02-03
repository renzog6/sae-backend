//filepath: sae-backend/src/modules/contacts/contacts.resolver.ts
import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ContactsService } from "./services/contacts.service";
import { Contact } from "./entities/contact.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { PaginatedContact } from "./dto/paginated-contact.dto";
import { PaginationArgs } from "@common/dto/pagination.args";
import { CreateContactInput, UpdateContactInput } from "./dto/contact-input.dto";
import { ContactFilterInput } from "./dto/contact-filter.input";

@Resolver(() => Contact)
export class ContactsResolver extends BaseResolver(Contact) {
    constructor(private readonly contactsService: ContactsService) {
        super(contactsService);
    }

    @Query(() => PaginatedContact, { name: "findContacts" })
    async findContacts(
        @Args() pagination: PaginationArgs,
        @Args("filter", { nullable: true }) filter?: ContactFilterInput
    ): Promise<PaginatedContact> {
        if (filter?.companyId && filter?.personId) {
            throw new Error(
                "Filter by companyId OR personId, not both at the same time"
            );
        }

        return this.contactsService.findAll(
            { ...pagination, deleted: "exclude" } as any,
            filter
        ) as any;
    }

    @Mutation(() => Contact)
    async createContact(
        @Args("input") input: CreateContactInput
    ): Promise<Contact> {
        const result = await this.contactsService.create(input as any);
        return result.data;
    }

    @Mutation(() => Contact)
    async updateContact(
        @Args("id", { type: () => Int }) id: number,
        @Args("input") input: UpdateContactInput
    ): Promise<Contact> {
        const result = await this.contactsService.update(id, input as any);
        return result.data;
    }

    @Mutation(() => Contact)
    async deleteContact(
        @Args("id", { type: () => Int }) id: number
    ): Promise<Contact> {
        return this.remove(id);
    }
}
