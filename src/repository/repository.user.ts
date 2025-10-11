import { User } from 'src/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import type {
  TypeUserModelStatic,
  InterfaceUserUpdate,
  InterfaceUserId,
  InterfaceUserCreation,
  InterfaceUserAttributes,
  InterfaceUserEmail,
} from 'src/structures/types/type.user';
import { Repository } from './repository.base';

@Injectable()
export class RepositoryUser extends Repository<User> {
  async create(creationInterface: InterfaceUserCreation): Promise<User> {
    creationInterface.loggedIn = false;
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

  async findByEmail({ email }: InterfaceUserEmail): Promise<User | null> {
    return await this.model.findOne({
      where: {
        email: email,
      },
    });
  }

  // async updateLoggedIn({ email }: InterfaceUserEmail, status: boolean) {
  //   return await this.model.update(
  //     {
  //       loggedIn: status,
  //     },
  //     {
  //       where: {
  //         email: email,
  //       },
  //     },
  //   );
  // }

  constructor(@InjectModel(User) private readonly model: TypeUserModelStatic) {
    super();
  }
}
