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
  async getDetail(id: InterfaceProjectId): Promise<Project | null> {
    const projects: Project | null = await this.repository.findByPk(id);

    return projects?.dataValues ?? projects;
  }

  async create(body: DtoProjectCreate, id: InterfaceUserId): Promise<Project> {
    const existing = await this.findByUserId(id);
    if (existing) {
      throw new ConflictException('A user can have only one active project.');
    }

    return await this.repository.create({ ...body, ownerId: id._id });
  }

  async update(
    body: DtoProjectUpdate,
    id: InterfaceUserId,
    projectId: InterfaceProjectId,
  ): Promise<Project> {
    const existing = await this.findByUserId(id);
    if (!existing) {
      throw new NotFoundException('User has not an project.');
    }

    console.log(existing.dataValues.id, id._id);
    console.log(projectId);

    if (Number(existing.dataValues.ownerId) != Number(id._id)) {
      throw new UnauthorizedException(
        'You have to be its owner to update a project',
      );
    }

    return await this.repository.update(body, projectId);
  }

  async checkUserOwnerProject(
    userId: InterfaceUserId,
    projectId: InterfaceProjectId,
  ) {
    const existing: Project | null =
      await this.repository.checkUserOwnerProject(userId, projectId);

    if (!existing) return null;
    return existing;
  }

  async findByUserId(id: InterfaceUserId): Promise<Project | null> {
    const userProject: Project | null = await this.repository.findByUserId(id);

    if (!userProject) {
      return null;
    }

    return userProject;
  }

  async delete(userId: InterfaceUserId, projectId: InterfaceProjectId) {
    const tx = await this.sequelize.transaction();
    try {
      const existing: Project | null = await this.checkUserOwnerProject(
        userId,
        projectId,
      );
      console.log('existing: ', existing);

      if (!existing) {
        throw new UnauthorizedException(
          'You have to be its owner to update a project',
        );
      }

      await this.repository.delete(projectId, tx);
    } catch (e) {
      tx.rollback();
      throw e;
    }
  }

  constructor(
    private readonly repository: RepositoryProject,
    private readonly sequelize: Sequelize,
  ) {}
}
