/*
//------------------------------------------------------------------------------ 
// This code was generated by Amplication. 
// 
// Changes to this file will be lost if the code is regenerated. 
//
// There are other ways to to customize your code, see this doc to learn more
// https://docs.amplication.com/docs/how-to/custom-code
//
//------------------------------------------------------------------------------
  */
import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDate, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreneauxConsultationDomicile } from "../../creneauxConsultationDomicile/base/CreneauxConsultationDomicile";
import { PatientSageFemmeMapping } from "../../patientSageFemmeMapping/base/PatientSageFemmeMapping";
import { Room } from "../../room/base/Room";
import { User } from "../../user/base/User";
import { Patient } from "../../patient/base/Patient";
@ObjectType()
class SagesFemme {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  updatedAt!: Date | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  deletedAt!: Date | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  geolocalisation!: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  diplome!: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  description!: string | null;

  @ApiProperty({
    required: false,
    type: () => [CreneauxConsultationDomicile],
  })
  @ValidateNested()
  @Type(() => CreneauxConsultationDomicile)
  @IsOptional()
  creneauxConsultationDomicile?: Array<CreneauxConsultationDomicile>;

  @ApiProperty({
    required: false,
    type: () => [PatientSageFemmeMapping],
  })
  @ValidateNested()
  @Type(() => PatientSageFemmeMapping)
  @IsOptional()
  patientSageFemmeMapping?: Array<PatientSageFemmeMapping>;

  @ApiProperty({
    required: false,
    type: () => Room,
  })
  @ValidateNested()
  @Type(() => Room)
  @IsOptional()
  room?: Room | null;

  @ApiProperty({
    required: false,
    type: () => User,
  })
  @ValidateNested()
  @Type(() => User)
  @IsOptional()
  user?: User | null;

  @ApiProperty({
    required: false,
    type: () => [Patient],
  })
  @ValidateNested()
  @Type(() => Patient)
  @IsOptional()
  patient?: Array<Patient>;
}
export { SagesFemme };