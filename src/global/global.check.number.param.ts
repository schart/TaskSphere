import { BadRequestException } from '@nestjs/common';

export function checkParamIsNumber(param: string): string {
  const id: number = Number(param.trim());
  if (!id || !Number.isInteger(id)) {
    throw new BadRequestException('Bad Request: Param Id Is Not Defined');
  }

  return String(id);
}
