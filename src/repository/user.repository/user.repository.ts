import { User } from 'src/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import type {
  UserCreationAttributes,
  UserModelStatic,
} from 'src/types/type.user-repository';

@Injectable()
export class UserRepository {
  async create(args: UserCreationAttributes): Promise<User> {
    return await this.userModel.create(args);
  }

  async findOne(_email: string): Promise<User | null> {
    return await this.userModel.findOne({ where: { email: _email } });
  }

  constructor(@InjectModel(User) private readonly userModel: UserModelStatic) {}
}
