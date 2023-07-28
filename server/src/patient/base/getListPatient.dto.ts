import { ApiProperty } from "@nestjs/swagger";
import { Patient } from "./Patient";
export class getListPatientDto {
  @ApiProperty({
    type: [Patient],
  })
  readonly paginatedResult!: [Patient];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
