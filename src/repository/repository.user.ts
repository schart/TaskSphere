import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project, Role, User } from 'src/models';
import type {
  TypeUserModelStatic,
  InterfaceUserCreation,
  InterfaceUserUpdate,
  InterfaceUserId,
  InterfaceUserEmail,
} from 'src/structures/types/type.user';
import { Repository } from './repository.base';

@Injectable()
export class RepositoryUser extends Repository<User> {
  /**
   * Create a new user
   */
  async create(dto: InterfaceUserCreation): Promise<User> {
    return this.model.create(dto as any);
  }

  /**
   * Update a user by ID
   */
  async update(
    dto: InterfaceUserUpdate,
    { _id }: InterfaceUserId,
  ): Promise<User | null> {
    const [_, affectedRows] = await this.model.update(dto, {
      where: { id: _id },
      returning: true,
    });

    return affectedRows.length ? affectedRows[0] : null;
  }

  /**
   * Get all users
   */
  async find(): Promise<User[]> {
    return this.model.findAll();
  }

  /**
   * Find a user by primary key (ID)
   */
  async findByPk({ _id }: InterfaceUserId): Promise<User | null> {
    return this.model.findByPk(_id, {
      attributes: { exclude: ['updatedAt'] },
      include: [
        {
          as: 'role',
          model: Role,
        },
        {
          as: 'project',
          model: Project,
          attributes: { exclude: ['updatedAt', 'ownerId'] },
        },
      ],
    });
  }

  /**
   * Find a user by email
   */
  async findByEmail({ email }: InterfaceUserEmail): Promise<User | null> {
    return this.model.findOne({ where: { email } });
  }

  constructor(@InjectModel(User) private readonly model: typeof User) {
    super();
  }
}
