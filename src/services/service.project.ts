import { Project } from 'src/models';
import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { InterfaceUserId } from 'src/structures';
import {
  DtoProjectCreate,
  DtoProjectUpdate,
} from 'src/structures/dto/dto.project';
import { RepositoryProject } from 'src/repository/repository.project';
import { InterfaceProjectId } from 'src/structures/types/type.project';

@Injectable()
export class ServiceProject {
  async create(
    body: DtoProjectCreate,
    { _id }: InterfaceUserId,
  ): Promise<Project> {
    return await this.repository.create({ ...body, ownerId: _id });
  }

  async update(
    body: DtoProjectUpdate,
    id: InterfaceProjectId,
  ): Promise<Project | null> {
    return await this.repository.update(body, id);
  }

  async findByUserId(id: InterfaceUserId): Promise<Project | null> {
    const userProject: Project | null = await this.repository.findByUserId(id);

    if (!userProject) {
      return null;
    }

    return userProject;
  }

  async deleteWithOwnTasks(id: InterfaceProjectId) {
    const tx = await this.sequelize.transaction();
    try {
      await this.repository.deleteWithOwnTasks(id, tx);
    } catch {
      tx.rollback();
    }
  }

  constructor(
    private readonly repository: RepositoryProject,
    private readonly sequelize: Sequelize,
  ) {}
}
