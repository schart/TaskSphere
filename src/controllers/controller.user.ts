import {
  Req,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Controller,
  UnauthorizedException,
  ParseIntPipe,
} from '@nestjs/common';
import { User } from 'src/models';
import type { Request } from 'express';
import { UserService } from 'src/services/service.user';
import { compareIds } from 'src/global/global.compare.ids';
import { UpdateUserDto, InterfaceUserId } from 'src/structures';
import { retrieveOwnerId } from 'src/global/global.retrieve.owner.id';
import { checkParamIsNumber } from 'src/global/global.check.number.param';
import { GuardJwtAuth, GuardShouldBeOwnerOfReq } from 'src/guards/guard.jwt';

@Controller('user')
export class ControllerUser {
  @UseGuards(GuardJwtAuth, GuardShouldBeOwnerOfReq)
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

  @UseGuards(GuardJwtAuth, GuardShouldBeOwnerOfReq)
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
