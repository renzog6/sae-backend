import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { TireEventsService } from "./tire-events.service";
import { TireEvent } from "../entities/tire-event.entity";
import { CreateTireEventDto } from "./dto/create-tire-event.dto";
import { TireEventType } from "@prisma/client";

@Resolver(() => TireEvent)
export class TireEventsResolver {
  constructor(private readonly tireEventsService: TireEventsService) {}

  @Query(() => [TireEvent], { name: "findAllTireEvents" })
  async findAll(): Promise<TireEvent[]> {
    const result = await this.tireEventsService.findAll();
    return result.data;
  }

  @Query(() => TireEvent, { name: "findOneTireEvent", nullable: true })
  async findOne(@Args("id", { type: () => Int }) id: number): Promise<any> {
    const result = await this.tireEventsService.findOne(id);
    return result.data;
  }

  @Query(() => [TireEvent], { name: "findTireEventsByTire" })
  async findByTire(
    @Args("tireId", { type: () => Int }) tireId: number,
  ): Promise<TireEvent[]> {
    return this.tireEventsService.findAllByTire(tireId);
  }

  @Query(() => [TireEvent], { name: "findTireEventsByTireAndType" })
  async findByTireAndType(
    @Args("tireId", { type: () => Int }) tireId: number,
    @Args("type", { type: () => TireEventType }) type: TireEventType,
  ): Promise<TireEvent[]> {
    return this.tireEventsService.findByTireAndType(tireId, type);
  }

  @Mutation(() => TireEvent, { name: "createTireEvent" })
  async create(@Args("input") input: CreateTireEventDto): Promise<TireEvent> {
    const result = await this.tireEventsService.create(input);
    return result.data;
  }

  @Mutation(() => Boolean, { name: "removeTireEvent" })
  async remove(@Args("id", { type: () => Int }) id: number): Promise<boolean> {
    await this.tireEventsService.remove(id);
    return true;
  }

  @Mutation(() => TireEvent, { name: "registerTireEvent" })
  async registerEvent(
    @Args("tireId", { type: () => Int }) tireId: number,
    @Args("type", { type: () => TireEventType }) type: TireEventType,
    @Args("description", { type: () => String }) description: string,
    @Args("kmAtEvent", { type: () => Int, nullable: true }) kmAtEvent?: number,
    @Args("data", { type: () => String, nullable: true }) data?: string,
  ): Promise<TireEvent> {
    const result = await this.tireEventsService.registerEvent(
      tireId,
      type,
      description,
      kmAtEvent,
      data ? JSON.parse(data) : undefined,
    );
    return result.data;
  }
}
