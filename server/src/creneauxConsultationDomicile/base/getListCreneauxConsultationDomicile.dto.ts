import { ApiProperty } from "@nestjs/swagger";
import { CreneauxConsultationDomicile } from "./CreneauxConsultationDomicile";
export class getListCreneauxConsultationDomicileDto {
  @ApiProperty({
    type: [CreneauxConsultationDomicile],
  })
  readonly paginatedResult!: [CreneauxConsultationDomicile];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
