import {
  Body,
  ConflictException,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { checkParamIsNumber } from 'src/global/global.check.number.param';
import { retrieveOwnerId } from 'src/global/global.retrieve.owner.id';
import { GuardJwtAuth, GuardShouldBeOwnerOfReq } from 'src/guards/guard.jwt';
import { Project } from 'src/models';
import { ServiceProject } from 'src/services/service.project';
import { InterfaceUserId } from 'src/structures';
import { DtoProjectCreate } from 'src/structures/dto/dto.project';
import { InterfaceProjectId } from 'src/structures/types/type.project';

@Controller('project')
export class ControllerProject {
  @UseGuards(GuardJwtAuth, GuardShouldBeOwnerOfReq)
  @Post('/')
  async create(@Body() body: DtoProjectCreate, @Req() req: Request) {
    const ownerIdRaw = retrieveOwnerId(req);
    const ownerId: InterfaceUserId = { _id: ownerIdRaw };

    const project: Project | null = await this.service.findByUserId(ownerId);
    if (project) {
      throw new ConflictException(
        'A user can have just one project at the same time.',
      );
    }

    let createdProject = await this.service.create(body, ownerId);
    let projectResult = !createdProject ? null : createdProject.dataValues;

    return {
      ...projectResult,
    };
  }

  @UseGuards(GuardJwtAuth, GuardShouldBeOwnerOfReq)
  @Delete('/:id')
  async delete(@Param('id') param: any, @Req() req: Request) {
    const projectIdRaw = checkParamIsNumber(param);
    const projectId: InterfaceProjectId = { _id: projectIdRaw };

    const ownerIdRaw = retrieveOwnerId(req);
    const ownerId: InterfaceUserId = { _id: ownerIdRaw };

    const project: Project | null = await this.service.findByUserId(ownerId);
    if (!project) {
      throw new NotFoundException('Project Not found');
    }

    await this.service.deleteWithOwnTasks(projectId);

    return {
      message: 'Project deleted with id: ' + projectId._id,
    };
  }

  constructor(private readonly service: ServiceProject) {}
}
