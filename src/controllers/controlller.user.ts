import {
  Req,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Controller,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/models';
import type { Request } from 'express';
import { UserService } from 'src/services/service.user';
import { compareIds } from 'src/global/global.compare.ids';
import { UpdateUserDto, InterfaceUserId } from 'src/structures';
import { retrieveOwnerId } from 'src/global/global.retrieve.owner.id';
import { checkParamIsNumber } from 'src/global/global.check.number.param';
import { GuardJwtAuth, GuardShouldBeOwnerOfReq } from 'src/strategies';

@Controller('user')
export class UserController {
  @UseGuards(GuardJwtAuth)
  @Get('/:id')
  async retrieveDetail(@Req() _req: Request, @Param('id') param: string) {
    const userIdRaw = checkParamIsNumber(param);
    const userId: InterfaceUserId = { _id: userIdRaw };

    let retrieveUserDetails: User | null =
      await this.service.retrieveDetailService(userId);
    let retrieveUserDetailsResult = !retrieveUserDetails
      ? null
      : retrieveUserDetails.dataValues;

    return {
      ...retrieveUserDetailsResult,
      message: 'Successfully',
    };
  }

  @UseGuards(GuardJwtAuth, GuardShouldBeOwnerOfReq)
  @Patch('/:id')
  async update(
    @Req() req: Request,
    @Body() body: UpdateUserDto,
    @Param('id') param: string,
  ) {
    const ownerIdRaw = retrieveOwnerId(req);
    const ownerId: InterfaceUserId = { _id: ownerIdRaw };

    const updateUserIdRaw = checkParamIsNumber(param);
    const updateUserId: InterfaceUserId = { _id: updateUserIdRaw };

    const result = compareIds(ownerId, updateUserId);
    if (!result) {
      throw new UnauthorizedException(
        'UnAuthorized: You can just access something in your authorization',
      );
    }

    const updatedUser: User | null = await this.service.updateService(
      body,
      updateUserId,
    );

    let updatedUserResult = !updatedUser ? null : updatedUser[0].dataValues;

    return {
      ...updatedUserResult, // Do not show the password to client.
      message: 'Successfully',
    };
  }

  constructor(private readonly service: UserService) {}
}
