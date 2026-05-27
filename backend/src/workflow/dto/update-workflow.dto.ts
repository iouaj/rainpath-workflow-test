import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateWorkflowDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsArray()
  @IsOptional()
  nodes?: any[];

  @IsArray()
  @IsOptional()
  edges?: any[];

  @IsObject()
  @IsOptional()
  viewport: {
    x: number;
    y: number;
    zoom: number;
  }
}