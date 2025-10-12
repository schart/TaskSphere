import { Request } from 'express';
import { NotFoundException } from '@nestjs/common';

export function retrieveOwnerId(req: Request): string {
  let ownerId: string | undefined | number = req['ownerId'];

  if (!ownerId) {
    throw new NotFoundException('Request must to be belongs to one');
  }

  return String(ownerId);
}
