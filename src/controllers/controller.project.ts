import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { retrieveOwnerId } from 'src/global/global.retrieve.owner.id';
import { ServiceProject } from 'src/services/service.project';
import { GuardJwtAuth, GuardShouldBeOwnerOfReq } from 'src/strategies';
import { InterfaceUserId } from 'src/structures';
import { DtoProjectCreate } from 'src/structures/dto/dto.project';

@Controller('project')
export class ControllerProject {
  @UseGuards(GuardJwtAuth, GuardShouldBeOwnerOfReq)
  @Post('/')
  async create(@Body() body: DtoProjectCreate, @Req() req: Request) {
    const ownerIdRaw = retrieveOwnerId(req);
    const ownerId: InterfaceUserId = { _id: ownerIdRaw };

    await this.service.userHasProject(ownerId);

    let createdProject = await this.service.create(body, ownerId);
    let projectResult = !createdProject ? null : createdProject.dataValues;

    return {
      ...projectResult,
      message: 'Successfully',
    };
  }

  constructor(private readonly service: ServiceProject) {}
}
