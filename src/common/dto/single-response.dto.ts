import { ApiProperty } from "@nestjs/swagger";

export class SingleResponseDto<T> {
  @ApiProperty()
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}
