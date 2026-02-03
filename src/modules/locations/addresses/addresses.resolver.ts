import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { AddressesService } from "./addresses.service";
import { Address } from "./entities/address.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { PaginatedAddress } from "./dto/paginated-address.dto";
import { PaginationArgs } from "@common/dto/pagination.args";
import { CreateAddressInput, UpdateAddressInput } from "./dto/address-input.dto";
import { AddressFilterInput } from "./dto/address-filter.input";

@Resolver(() => Address)
export class AddressesResolver extends BaseResolver(Address) {
    constructor(private readonly addressesService: AddressesService) {
        super(addressesService);
    }

    @Query(() => PaginatedAddress, { name: "findAddresses" })
    async findAddresses(
        @Args() pagination: PaginationArgs,
        @Args("filter", { nullable: true }) filter?: AddressFilterInput
    ): Promise<PaginatedAddress> {
        return this.addressesService.findAll(
            { ...pagination, deleted: "exclude" } as any,
            filter
        ) as any;
    }

    @Mutation(() => Address)
    async createAddress(
        @Args("input") input: CreateAddressInput
    ): Promise<Address> {
        const result = await this.addressesService.create(input as any);
        return result.data as any;
    }

    @Mutation(() => Address)
    async updateAddress(
        @Args("id", { type: () => Int }) id: number,
        @Args("input") input: UpdateAddressInput
    ): Promise<Address> {
        const result = await this.addressesService.update(id, input as any);
        return result.data as any;
    }

    @Mutation(() => Address)
    async deleteAddress(
        @Args("id", { type: () => Int }) id: number
    ): Promise<Address> {
        return this.remove(id);
    }
}
