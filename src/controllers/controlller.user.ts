import {
  Body,
  Controller,
  Param,
  Patch,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/models';
import type { Request } from 'express';
import { UpdateUserDto } from 'src/structures';
import { UserService } from 'src/services/service.user';
import { compareIds } from 'src/global/global.compare.ids';
import { retrieveOwnerId } from 'src/global/global.retrieve.owner.id';
import { JwtAuthGuard, ShouldBeOwnerOfReqGuard } from 'src/strategies';
import { checkParamIsNumber } from 'src/global/global.check.number.param';

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

    let updatedUserResult = !updatedUser ? null : updatedUser[0].dataValues;

    return {
      ...updatedUserResult, // Do not show the password to client.
      message: 'Success Update',
    };
  }

  constructor(private readonly userService: UserService) {}
}
