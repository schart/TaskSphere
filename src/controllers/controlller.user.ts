import { UpdateUserDto } from 'src/structures';
import { UserRepository } from 'src/repository';
import { JwtAuthGuard, ShouldBeOwnerOfReqGuard } from 'src/strategies';
import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Patch,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { User } from 'src/models';
import { retrieveOwnerId } from 'src/global/global.retrieve.owner.id';
import { checkParamIsNumber } from 'src/global/global.check.number.param';
import { compareIds } from 'src/global/global.compare.ids';
import { UserService } from 'src/services/service.user';

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard, ShouldBeOwnerOfReqGuard)
  @Patch('/:id')
  async update(
    @Req() req: Request,
    @Body() body: UpdateUserDto,
    @Param('id') param: string,
  ) {
    const ownerId: number = retrieveOwnerId(req);
    const updateUserId: number = checkParamIsNumber(param);

    const result = compareIds(ownerId, updateUserId);
    if (!result) {
      throw new UnauthorizedException(
        'UnAuthorized: You can just access something in your authorization',
      );
    }

    const updatedUser: User | null = await this.userService.updateService(
      body,
      updateUserId,
    );

    return {
      ...updatedUser,
      ok: true,
      message: 'Success login',
    };
  }

  constructor(private readonly userService: UserService) {}
}
