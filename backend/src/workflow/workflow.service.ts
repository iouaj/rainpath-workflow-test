import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateWorkflowDto } from "./dto/create-workflow.dto";
import { UpdateWorkflowDto } from "./dto/update-workflow.dto";

@Injectable()
export class WorkflowService {
    constructor(private readonly prisma: PrismaService) {}

    async getWorflows() {
        return this.prisma.workflow.findMany();
    }

    async create(createWorkflowDto : CreateWorkflowDto) {
        return this.prisma.workflow.create({
            data: {
                name: createWorkflowDto.name,
                nodes: createWorkflowDto.nodes,
                edges: createWorkflowDto.edges,
                viewport: createWorkflowDto.viewport
            }
        });
    }

    async findOne(id: string) {
        return this.prisma.workflow.findUnique({
            where: { id },
        });
    }

    async update(id: string, updateWorkflowDto : UpdateWorkflowDto) { //Inutiliser
        return this.prisma.workflow.update({
            where: { id },
            data: {
                ...updateWorkflowDto
            }
        });
    }
}
