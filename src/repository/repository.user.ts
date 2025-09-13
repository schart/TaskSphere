import { User } from 'src/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import type {
  UserModelStatic,
  UserUpdateAttributes,
  UserCreationAttributes,
  UserIdInterface,
} from 'src/structures/types/type.user-repository';
import { Repository } from './repository.base';

@Injectable()
export class UserRepository extends Repository<User> {
  async create(creationInterface: UserCreationAttributes): Promise<User> {
    return await this.model.create(creationInterface);
  }

  async findByPk({ _id }: UserIdInterface): Promise<User | null> {
    return await this.model.findByPk(_id);
  }

  async find(): Promise<User[] | null> {
    return await this.model.findAll();
  }

  async update(
    updateInterface: UserUpdateAttributes,
    { _id }: UserIdInterface,
  ): Promise<User | any> {
    const [_, affectedRows] = await this.model.update(
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
    return await this.model.findOne({
      where: {
        email: _email,
      },
    });
  }

  constructor(@InjectModel(User) private readonly model: UserModelStatic) {
    super();
  }
}
