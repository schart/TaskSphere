import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { ServiceProject } from 'src/services/service.project';
import { retrieveOwnerId } from 'src/global/global.parse.ownerId';
import { GuardJwtAuth, GuardGetSessionUserID } from 'src/guards/guard.jwt';
import {
  DtoProjectCreate,
  DtoProjectUpdate,
} from 'src/structures/dto/dto.project';
import { InterfaceUserId } from 'src/structures';
import { ServiceAuth } from 'src/services';

@Controller('project')
export class ControllerProject {
  private readonly logger: Logger = new Logger();

  @UseGuards(GuardJwtAuth, GuardGetSessionUserID)
  @Get('/:id')
  async getDetail(
    @Req() req: Request,
    @Param('id', ParseIntPipe) projectId: number,
  ) {
    const userId: InterfaceUserId = retrieveOwnerId(req);
    return await this.service.getProjectById({ _id: projectId }, userId);
  }

  @UseGuards(GuardJwtAuth, GuardGetSessionUserID)
  @Post('/')
  async create(
    @Body() body: DtoProjectCreate,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user: any = req.user;
    const ownerId = retrieveOwnerId(req);
    const response = await this.service.create(body, ownerId);

    const { access_token, refresh_token } =
      await this.authService.generateToken({
        id: user['id'],
        email: user['email'],
        username: user['username'],
        projectId: response.id,
      });

    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'none',
      secure: false,
    });

    res.cookie('access_token', access_token, {
      // httpOnly: true,
      // secure: false, // while production: true
      // sameSite: 'none', // For will be able sen others sites
      maxAge: 24 * 60 * 60 * 1000,
    });

    return response;
  }

  @UseGuards(GuardJwtAuth, GuardGetSessionUserID)
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) projectId: number,
    @Req() req: Request,
    @Body() body: DtoProjectUpdate,
  ) {
    const ownerId = retrieveOwnerId(req);
    return await this.service.update(body, ownerId, { _id: projectId });
  }

  @UseGuards(GuardJwtAuth, GuardGetSessionUserID)
  @Delete('/:id')
  async delete(
    @Param('id', ParseIntPipe) projectId: number,
    @Req() req: Request,
  ) {
    const ownerId = retrieveOwnerId(req);
    return await this.service.delete(ownerId, { _id: projectId });
  }

  constructor(
    private readonly service: ServiceProject,
    private readonly authService: ServiceAuth,
  ) {}
}
