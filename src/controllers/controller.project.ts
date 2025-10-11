import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Project } from 'src/models';
import type { Request } from 'express';
import { InterfaceUserId } from 'src/structures';
import { ServiceProject } from 'src/services/service.project';
import { retrieveOwnerId } from 'src/global/global.retrieve.owner.id';
import { InterfaceProjectId } from 'src/structures/types/type.project';
import { checkParamIsNumber } from 'src/global/global.check.number.param';
import { GuardJwtAuth, GuardShouldBeOwnerOfReq } from 'src/guards/guard.jwt';
import {
  DtoProjectCreate,
  DtoProjectUpdate,
} from 'src/structures/dto/dto.project';

@Controller('project')
export class ControllerProject {
  // @UseGuards(GuardJwtAuth, GuardShouldBeOwnerOfReq)
  // @Get('/')
  // async get() {}

  @UseGuards(GuardJwtAuth)
  @Get('/:id')
  async getDetail(@Req() _req: Request, @Param('id') param: any) {
    const projectIdRaw = checkParamIsNumber(param);
    const projectId: InterfaceProjectId = { _id: projectIdRaw };

    const projects: Project | null = await this.service.getDetail(projectId);

    return projects?.dataValues ?? projects;
  }

  @UseGuards(GuardJwtAuth, GuardShouldBeOwnerOfReq)
  @Post('/')
  async create(@Body() body: DtoProjectCreate, @Req() req: Request) {
    const ownerIdRaw = retrieveOwnerId(req);
    const ownerId: InterfaceUserId = { _id: ownerIdRaw };

    await this.service.findByUserId(ownerId);
    const createdProject = await this.service.create(body, ownerId);

    return createdProject?.dataValues ?? createdProject;
  }

  @UseGuards(GuardJwtAuth, GuardShouldBeOwnerOfReq)
  @Patch('/:id')
  async update(
    @Param('id') param: any,
    @Req() req: Request,
    @Body() body: DtoProjectUpdate,
  ) {
    const projectIdRaw = checkParamIsNumber(param);
    const projectId: InterfaceProjectId = { _id: projectIdRaw };

    const ownerIdRaw = retrieveOwnerId(req);
    const ownerId: InterfaceUserId = { _id: ownerIdRaw };

    const updatedProject: Project = await this.service.update(
      body,
      ownerId,
      projectId,
    );

    return updatedProject.dataValues ?? updatedProject;
  }

  @UseGuards(GuardJwtAuth, GuardShouldBeOwnerOfReq)
  @Delete('/:id')
  async delete(@Param('id') param: any, @Req() req: Request) {
    const projectIdRaw = checkParamIsNumber(param);
    const projectId: InterfaceProjectId = { _id: projectIdRaw };

    const ownerIdRaw = retrieveOwnerId(req);
    const ownerId: InterfaceUserId = { _id: ownerIdRaw };

    return await this.service.delete(ownerId, projectId);
  }

  constructor(private readonly service: ServiceProject) {}
}
