import { ConflictException, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Project } from 'src/models';
import { RepositoryProject } from 'src/repository/repository.project';
import { InterfaceUserId } from 'src/structures';
import { DtoProjectCreate } from 'src/structures/dto/dto.project';
import { InterfaceProjectId } from 'src/structures/types/type.project';

@Injectable()
export class ServiceProject {
  async create(
    body: DtoProjectCreate,
    { _id }: InterfaceUserId,
  ): Promise<Project> {
    return await this.repository.create({ ...body, ownerId: _id });
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
