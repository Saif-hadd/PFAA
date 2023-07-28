import { ApiProperty } from "@nestjs/swagger";
import { SagesFemme } from "./SagesFemme";
export class getListSagesFemmeDto {
  @ApiProperty({
    type: [SagesFemme],
  })
  readonly paginatedResult!: [SagesFemme];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
