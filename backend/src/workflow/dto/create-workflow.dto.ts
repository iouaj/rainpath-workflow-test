import { IsArray, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateWorkflowDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  nodes: any[];

  @IsArray()
  @IsNotEmpty()
  edges: any[];

  @IsObject()
  @IsNotEmpty()
  viewport: {
    x: number;
    y: number;
    zoom: number;
  }
}