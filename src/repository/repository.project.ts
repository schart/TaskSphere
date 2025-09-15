import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from './repository.base';
import { Project } from 'src/models';
import type {
  ProjectModelStatic,
  InterfaceProjectId,
  InterfaceProjectUpdate,
} from 'src/structures/types/type.project';
import { InjectModel } from '@nestjs/sequelize';
import { InterfaceUserId } from 'src/structures';

@Injectable()
export class RepositoryProject extends Repository<Project> {
  async create(InterfaceProjectCreation: any): Promise<Project> {
    return await this.model.create(InterfaceProjectCreation);
  }

  async update(
    updateInterface: InterfaceProjectUpdate,
    { _id }: InterfaceProjectId,
  ): Promise<any | Project> {
    const [_, affectedRows] = await this.model.update(
      {
        ...updateInterface,
      },
      {
        where: {
          _id: _id,
        },
        returning: true,
      },
    );

    return affectedRows || null;
  }

  async find(): Promise<Project[] | null> {
    return this.model.findAll();
  }

  async findByPk({ _id }: InterfaceProjectId): Promise<Project | null> {
    return await this.model.findByPk(_id);
  }

  async userHasProject({ _id }: InterfaceUserId): Promise<Project | null> {
    return await this.model.findOne({
      where: {
        ownerId: _id,
      },
    });
  }

  constructor(
    @InjectModel(Project) private readonly model: ProjectModelStatic,
  ) {
    super();
  }
}
