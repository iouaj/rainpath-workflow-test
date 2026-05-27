import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { WorkflowService } from "./workflow.service";
import { CreateWorkflowDto } from "./dto/create-workflow.dto";
import { UpdateWorkflowDto } from "./dto/update-workflow.dto";

@Controller('workflow')
export class WorkflowController {
    constructor(private readonly workflowService : WorkflowService) {}

    @Get()
    async getAll() {
        return this.workflowService.getWorflows();
    }

    @Get(':id')
    async getWorkflow(@Param('id') id: string) {
        return this.workflowService.findOne(id);
    }

    @Post()
    async   createWorkflow(@Body() createWorkflowDto : CreateWorkflowDto) {
        return this.workflowService.create(createWorkflowDto);
    }

    @Patch(':id') //Inutiliser
    async update(@Param('id') id: string, @Body() updateWorkflowDto: UpdateWorkflowDto) {
        return this.workflowService.update(id, updateWorkflowDto);
    }
}
