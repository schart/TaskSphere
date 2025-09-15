import { Injectable } from '@nestjs/common';
import { User } from 'src/models';
import { RepositoryUser } from 'src/repository';
import { InterfaceUserId, InterfaceUserUpdate } from 'src/structures';

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

  constructor(private readonly repository: RepositoryUser) {}
}
