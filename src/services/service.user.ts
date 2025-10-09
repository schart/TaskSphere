import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/models';
import { RepositoryUser } from 'src/repository';
import {
  InterfaceUserEmail,
  InterfaceUserId,
  InterfaceUserUpdate,
} from 'src/structures';

@Injectable()
export class UserService {
  async updateService(
    body: InterfaceUserUpdate,
    _id: InterfaceUserId,
  ): Promise<User | null> {
    return await this.repository.update(body, _id);
  }

  async retrieveDetailService(_id: InterfaceUserId): Promise<User | null> {
    return await this.repository.findByPk(_id);
  }

  async loggedInService(email: InterfaceUserEmail): Promise<Boolean | any> {
    const user: User | null = await this.repository.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    console.log(user.dataValues.loggedIn);
    if (user.dataValues.loggedIn == true) return true;
    return false;
  }

  constructor(private readonly repository: RepositoryUser) {}
}
