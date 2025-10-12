import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/models';
import { RepositoryUser } from 'src/repository';
import {
  InterfaceUserEmail,
  InterfaceUserId,
  InterfaceUserUpdate,
} from 'src/structures';

@Injectable()
export class UserService {
  async update(
    body: InterfaceUserUpdate,
    _id: InterfaceUserId,
  ): Promise<User | null> {
    return await this.repository.update(body, _id);
  }

  async getUserById(
    userId: InterfaceUserId,
    ownerId: InterfaceUserId,
  ): Promise<User | null> {
    const user: User | null = await this.repository.findByPk(userId);
    if (!user) throw new NotFoundException('User not found.');

    if (userId._id !== ownerId._id) {
      throw new UnauthorizedException(
        'You should be admin or yourself for retrieve details.',
      );
    }

    return user.get({ plain: true });
  }

  constructor(private readonly repository: RepositoryUser) {}
}
