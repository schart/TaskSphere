import { Project } from 'src/models';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InterfaceUserId } from 'src/structures';
import {
  DtoProjectCreate,
  DtoProjectUpdate,
} from 'src/structures/dto/dto.project';
import { RepositoryProject } from 'src/repository/repository.project';
import { InterfaceProjectId } from 'src/structures/types/type.project';

@Injectable()
export class ServiceProject {
  async createService(
    body: DtoProjectCreate,
    id: InterfaceUserId,
  ): Promise<Project> {
    const existing = await this.repository.findByUserId(id);
    if (existing) {
      throw new ConflictException('A user can have only one active project.');
    }

    return await this.repository.create({ ...body, ownerId: id._id });
  }

  async updateService(
    body: DtoProjectUpdate,
    id: InterfaceUserId,
    projectId: InterfaceProjectId,
  ): Promise<null | Project> {
    const existing = await this.checkUserOwnerProjectService(id, projectId);
    if (!existing) {
      throw new UnauthorizedException(
        'You have to be its owner to update a project',
      );
    }

    const updatedProject: Project | null = await this.repository.update(
      body,
      projectId,
    );

    return updatedProject?.dataValues ?? updatedProject;
  }

  async deleteService(
    userId: InterfaceUserId,
    projectId: InterfaceProjectId,
  ): Promise<number> {
    try {
      const existing: Project | null = await this.checkUserOwnerProjectService(
        userId,
        projectId,
      );

      if (!existing) {
        throw new UnauthorizedException(
          'You have to be its owner to delete a project',
        );
      }

      return await this.repository.delete(projectId);
    } catch (e) {
      throw e;
    }
  }

  async checkUserOwnerProjectService(
    userId: InterfaceUserId,
    projectId: InterfaceProjectId,
  ) {
    const existing: Project | null =
      await this.repository.checkUserOwnerProject(userId, projectId);

    if (!existing) return null;
    return existing;
  }

  async getDetailService(id: InterfaceProjectId): Promise<Project | null> {
    const projects: Project | null = await this.repository.findByPk(id);
    return projects?.dataValues ?? projects;
  }

  constructor(
    private readonly repository: RepositoryProject,
    // private readonly sequelize: Sequelize,
  ) {}
}
