import { BadRequestException } from '@nestjs/common';

export function checkParamIsNumber(param: string): number {
  const id: number = Number(param.trim());
  if (!id || !Number.isInteger(id)) {
    throw new BadRequestException('Bad Request: Param Id Is Not Defined');
  }

  return id;
}
