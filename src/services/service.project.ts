import { Project } from 'src/models';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
  async create(body: DtoProjectCreate, id: InterfaceUserId): Promise<Project> {
    const existing = await this.findByUserId(id);
    if (existing) {
      throw new ConflictException('A user can have only one active project.');
    }

    return await this.repository.create({ ...body, ownerId: id });
  }

  async update(
    body: DtoProjectUpdate,
    id: InterfaceUserId,
    projectId: InterfaceProjectId,
  ): Promise<Project> {
    const existing = await this.findByUserId(id); // Exist project
    if (!existing) {
      throw new NotFoundException('User has not an project.');
    }

    if (Number(existing.id) != Number(projectId._id)) {
      throw new UnauthorizedException(
        'You have to be its owner to update a project',
      );
    }

    return await this.repository.update(body, projectId);
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
