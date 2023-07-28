import { ApiProperty } from "@nestjs/swagger";
import { PatientSageFemmeMapping } from "./PatientSageFemmeMapping";
export class getListPatientSageFemmeMappingDto {
  @ApiProperty({
    type: [PatientSageFemmeMapping],
  })
  readonly paginatedResult!: [PatientSageFemmeMapping];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
