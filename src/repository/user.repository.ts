import { Project, User } from 'src/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import type {
  UserCreationAttributes,
  UserModelStatic,
  UserUpdateAttributes,
} from 'src/types/type.user-repository';
import { Repository } from './repository.base';

@Injectable()
export class UserRepository extends Repository<User> {
  async create(creationInterface: UserCreationAttributes): Promise<User> {
    return await this.userModel.create(creationInterface);
  }

  async findByPk(_id: number): Promise<User | null> {
    return await this.userModel.findByPk(_id);
  }

  async find(): Promise<User[] | null> {
    return await this.userModel.findAll();
  }

  async update(
    updateInterface: UserUpdateAttributes,
    _id: number,
  ): Promise<User | any> {
    return await this.userModel.update(
      { ...updateInterface },
      { where: { _id: _id } },
    );
  }

  async findByEmail(_email: string): Promise<User | null> {
    return await this.userModel.findOne({
      where: {
        email: _email,
      },
    });
  }

  constructor(@InjectModel(User) private readonly userModel: UserModelStatic) {
    super();
  }
}
