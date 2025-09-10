import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import type { RevokedTokenModelStatic } from 'src/structures/types';
import { RevokedToken } from 'src/models/model.revoked.tokens';

@Injectable()
export class RevokedTokenRepository {
  async create(token: any) {
    return this.revokedTokenModel.create(token);
  }

  async findOne(token: string) {
    return this.revokedTokenModel.findOne({
      where: {
        token: token,
      },
    });
  }

  constructor(
    @InjectModel(RevokedToken)
    private readonly revokedTokenModel: RevokedTokenModelStatic,
  ) {}
}
