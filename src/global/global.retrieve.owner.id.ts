import { Request } from 'express';
import { NotFoundException } from '@nestjs/common';

export function retrieveOwnerId(req: Request): number {
  let ownerId: string | undefined | number = req['ownerId'];
  if (!ownerId) {
    throw new NotFoundException('Request must to be belongs to one');
  }
  ownerId = Number(ownerId);
  return ownerId;
}
