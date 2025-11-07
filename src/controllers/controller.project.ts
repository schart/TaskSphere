import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { ServiceProject } from 'src/services/service.project';
import { retrieveOwnerId } from 'src/global/global.retrieve.owner.id';
import { GuardJwtAuth, GuardShouldBeOwnerOfReq } from 'src/guards/guard.jwt';
import {
  DtoProjectCreate,
  DtoProjectUpdate,
} from 'src/structures/dto/dto.project';
import { InterfaceUserId } from 'src/structures';

@Controller('project')
export class ControllerProject {
  @UseGuards(GuardJwtAuth, GuardShouldBeOwnerOfReq)
  @Get('/:id')
  async getDetail(
    @Req() req: Request,
    @Param('id', ParseIntPipe) projectId: number,
  ) {
    const userId: InterfaceUserId = retrieveOwnerId(req);
    return await this.service.getProjectById({ _id: projectId }, userId);
  }

  @UseGuards(GuardJwtAuth, GuardShouldBeOwnerOfReq)
  @Post('/')
  async create(@Body() body: DtoProjectCreate, @Req() req: Request) {
    const ownerId = retrieveOwnerId(req);
    return await this.service.create(body, ownerId);
  }

  @UseGuards(GuardJwtAuth, GuardShouldBeOwnerOfReq)
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) projectId: number,
    @Req() req: Request,
    @Body() body: DtoProjectUpdate,
  ) {
    const ownerId = retrieveOwnerId(req);
    return await this.service.update(body, ownerId, { _id: projectId });
  }

  @UseGuards(GuardJwtAuth, GuardShouldBeOwnerOfReq)
  @Delete('/:id')
  async delete(
    @Param('id', ParseIntPipe) projectId: number,
    @Req() req: Request,
  ) {
    const ownerId = retrieveOwnerId(req);
    return await this.service.delete(ownerId, { _id: projectId });
  }

  constructor(private readonly service: ServiceProject) {}
}
