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
  constructor(private readonly repository: RepositoryProject) {}

  async create(
    body: DtoProjectCreate,
    user: InterfaceUserId,
  ): Promise<Project> {
    const existing = await this.repository.findByUserId(user);
    if (existing) {
      throw new ConflictException('A user can have only one active project.');
    }
    return this.repository.create({ ...body, ownerId: user._id });
  }

  async update(
    body: DtoProjectUpdate,
    user: InterfaceUserId,
    projectId: InterfaceProjectId,
  ): Promise<Project | null> {
    const project = await this.checkUserOwnerProject(user, projectId);
    if (!project)
      throw new UnauthorizedException(
        'You must be the owner to update this project.',
      );

    return this.repository.update(body, projectId);
  }

  async delete(
    user: InterfaceUserId,
    projectId: InterfaceProjectId,
  ): Promise<number> {
    const project = await this.checkUserOwnerProject(user, projectId);
    if (!project)
      throw new UnauthorizedException(
        'You must be the owner to delete this project.',
      );

    return this.repository.delete(projectId);
  }

  async checkUserOwnerProject(
    user: InterfaceUserId,
    projectId: InterfaceProjectId,
  ): Promise<Project | null> {
    return this.repository.checkUserOwnerProject(user, projectId);
  }

  async getProjectById(id: InterfaceProjectId): Promise<Project | null> {
    return this.repository.findByPk(id);
  }
}
