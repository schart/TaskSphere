import { ConflictException, Injectable } from '@nestjs/common';
import { Project } from 'src/models';
import { RepositoryProject } from 'src/repository/repository.project';
import { InterfaceUserId } from 'src/structures';
import { DtoProjectCreate } from 'src/structures/dto/dto.project';

@Injectable()
export class ServiceProject {
  async create(
    body: DtoProjectCreate,
    { _id }: InterfaceUserId,
  ): Promise<Project> {
    return await this.repository.create({ ...body, ownerId: _id });
  }

  async userHasProject(id: InterfaceUserId) {
    const userProject: Project | null =
      await this.repository.userHasProject(id);

    if (userProject) {
      throw new ConflictException('The user already has an existing project.');
    }

    return;
  }

  constructor(private readonly repository: RepositoryProject) {}
}
