import { Injectable } from '@nestjs/common';
import { User } from 'src/models';
import { UserRepository } from 'src/repository';
import { UserUpdateAttributes } from 'src/structures';

@Injectable()
export class UserService {
  async updateService(
    body: UserUpdateAttributes,
    updateUserId: number,
  ): Promise<User | null> {
    return await this.userRepository.update(body, updateUserId);
  }

  constructor(private readonly userRepository: UserRepository) {}
}
