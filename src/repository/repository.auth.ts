import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RevokedToken } from 'src/models/model.revoked.tokens';
import type { InterfaceRevokedTokenModel } from 'src/structures/types';

@Injectable()
export class RepositoryAuth {
  async create(token: any): Promise<RevokedToken | undefined> {
    return this.model.create(token);
  }

  async findOne(token: string): Promise<RevokedToken | null> {
    return this.model.findOne({
      where: {
        token: token,
      },
    });
  }

  constructor(
    @InjectModel(RevokedToken)
    private readonly model: InterfaceRevokedTokenModel,
  ) {}
}
