import { User } from 'src/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import type {
  UserModelStatic,
  UserUpdateAttributes,
  UserCreationAttributes,
  UserAttributes,
  UserIdInterface,
} from 'src/structures/types/type.user-repository';
import { Repository } from './repository.base';

@Injectable()
export class UserRepository extends Repository<User> {
  async create(creationInterface: UserCreationAttributes): Promise<User> {
    return await this.userModel.create(creationInterface);
  }

  async findByPk({ _id }: UserIdInterface): Promise<User | null> {
    return await this.userModel.findByPk(_id);
  }

  async find(): Promise<User[] | null> {
    return await this.userModel.findAll();
  }

  async update(
    updateInterface: UserUpdateAttributes,
    { _id }: UserIdInterface,
  ): Promise<User | any> {
    const [_, affectedRows] = await this.userModel.update(
      {
        ...updateInterface,
      },
      {
        where: { _id: _id },
        returning: true,
      },
    );

    return affectedRows || null;
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
