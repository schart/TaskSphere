import { User } from 'src/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import type {
  TypeUserModelStatic,
  InterfaceUserUpdate,
  InterfaceUserId,
  InterfaceUserCreation,
  InterfaceUserAttributes,
} from 'src/structures/types/type.user-repository';
import { Repository } from './repository.base';

@Injectable()
export class RepositoryUser extends Repository<User> {
  async create(creationInterface: InterfaceUserCreation): Promise<User> {
    return await this.model.create(creationInterface);
  }

  async update(
    updateInterface: InterfaceUserUpdate,
    { _id }: InterfaceUserId,
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

  async find(): Promise<User[] | null> {
    return await this.model.findAll();
  }

  async findByPk({ _id }: InterfaceUserId): Promise<User | null> {
    return await this.model.findByPk(_id);
  }

  async findByEmail(
    _email: Pick<InterfaceUserAttributes, 'email'>,
  ): Promise<User | null> {
    return await this.model.findOne({
      where: {
        email: _email,
      },
    });
  }

  constructor(@InjectModel(User) private readonly model: TypeUserModelStatic) {
    super();
  }
}
