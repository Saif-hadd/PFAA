import { ApiProperty } from "@nestjs/swagger";
import { Room } from "./Room";
export class getListRoomDto {
  @ApiProperty({
    type: [Room],
  })
  readonly paginatedResult!: [Room];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
