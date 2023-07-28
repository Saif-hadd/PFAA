import { ApiProperty } from "@nestjs/swagger";
import { Message } from "./Message";
export class getListMessageDto {
  @ApiProperty({
    type: [Message],
  })
  readonly paginatedResult!: [Message];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
