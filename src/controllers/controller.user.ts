import {
  Req,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';
import { User } from 'src/models';
import type { Request } from 'express';
import { UserService } from 'src/services/service.user';
import { UpdateUserDto } from 'src/structures';
import { retrieveOwnerId } from 'src/global/global.parse.ownerId';
import { GuardJwtAuth, GuardGetSessionUserID } from 'src/guards/guard.jwt';

@Controller('user')
export class ControllerUser {
  @UseGuards(GuardJwtAuth, GuardGetSessionUserID)
  @Get('/:id')
  async getDetail(
    @Req() req: Request,
    @Param('id', ParseIntPipe) userId: number,
  ) {
    const ownerId = retrieveOwnerId(req);
    return await this.service.getUserById(
      {
        _id: userId,
      },
      ownerId,
    );
  }

  @UseGuards(GuardJwtAuth, GuardGetSessionUserID)
  @Patch('/:id')
  async update(
    @Req() req: Request,
    @Body() body: UpdateUserDto,
    @Param('id') userId: string,
  ) {
    const ownerId = retrieveOwnerId(req);
    const updatedUser: User | null = await this.service.update(body, ownerId);

    let updatedUserResult = !updatedUser ? null : updatedUser[0].dataValues;

    return {
      ...updatedUserResult,
    };
  }

  constructor(private readonly service: UserService) {}
}
