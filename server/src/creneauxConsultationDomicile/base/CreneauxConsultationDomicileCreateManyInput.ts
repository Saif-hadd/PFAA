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
import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { SagesFemmeWhereUniqueInput } from "../../sagesFemme/base/SagesFemmeWhereUniqueInput";
@InputType()
class CreneauxConsultationDomicileCreateManyInput {
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  deletedAt?: Date | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  jour?: string | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  heureDebut?: Date | null;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  heureFin?: Date | null;

  @ApiProperty({
    required: false,
    type: () => SagesFemmeWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => SagesFemmeWhereUniqueInput)
  @IsOptional()
  @Field(() => SagesFemmeWhereUniqueInput, {
    nullable: true,
  })
  sagesFemmes?: SagesFemmeWhereUniqueInput | null;
}
export { CreneauxConsultationDomicileCreateManyInput };
