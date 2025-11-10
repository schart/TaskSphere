import { Request } from 'express';
import { NotFoundException } from '@nestjs/common';
import { InterfaceUserId } from 'src/structures';

export function retrieveOwnerId(req: Request): InterfaceUserId {
  let ownerId: InterfaceUserId = { _id: req['ownerId'] };

  if (!ownerId) {
    throw new NotFoundException('Request must to be belongs to one');
  }

  return ownerId;
}
