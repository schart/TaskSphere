import { Injectable } from '@nestjs/common';
import { User } from 'src/models';
import { UserRepository } from 'src/repository';
import { UserIdInterface, UserUpdateAttributes } from 'src/structures';

@Injectable()
export class UserService {
  async updateService(
    body: UserUpdateAttributes,
    _id: UserIdInterface,
  ): Promise<User | null> {
    return await this.userRepository.update(body, _id);
  }

  async retrieveDetailService(_id: UserIdInterface): Promise<User | null> {
    return await this.userRepository.findByPk(_id);
  }

  constructor(private readonly userRepository: UserRepository) {}
}
