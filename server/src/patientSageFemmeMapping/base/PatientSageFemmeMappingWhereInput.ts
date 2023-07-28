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
import { StringFilter } from "../../util/StringFilter";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { BooleanNullableFilter } from "../../util/BooleanNullableFilter";
import { PatientWhereUniqueInput } from "../../patient/base/PatientWhereUniqueInput";
import { SagesFemmeWhereUniqueInput } from "../../sagesFemme/base/SagesFemmeWhereUniqueInput";
@InputType()
class PatientSageFemmeMappingWhereInput {
  @ApiProperty({
    required: false,
    type: StringFilter,
  })
  @Type(() => StringFilter)
  @IsOptional()
  @Field(() => StringFilter, {
    nullable: true,
  })
  id?: StringFilter;

  @ApiProperty({
    required: false,
    type: BooleanNullableFilter,
  })
  @Type(() => BooleanNullableFilter)
  @IsOptional()
  @Field(() => BooleanNullableFilter, {
    nullable: true,
  })
  estSagefemmeReference?: BooleanNullableFilter;

  @ApiProperty({
    required: false,
    type: () => PatientWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => PatientWhereUniqueInput)
  @IsOptional()
  @Field(() => PatientWhereUniqueInput, {
    nullable: true,
  })
  patient?: PatientWhereUniqueInput;

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
  sagesFemmes?: SagesFemmeWhereUniqueInput;
}
export { PatientSageFemmeMappingWhereInput };
