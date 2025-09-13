import { ConflictException, Injectable } from '@nestjs/common';
import { Project } from 'src/models';
import { RepositoryProject } from 'src/repository/repository.project';
import { UserIdInterface } from 'src/structures';
import { DtoProjectCreate } from 'src/structures/dto/dto.project';

@Injectable()
export class ServiceProject {
  async create(body: DtoProjectCreate, id: UserIdInterface): Promise<Project> {
    return await this.repository.create({ ...body, ownerId: id._id });
  }

  async userHasProject(id: UserIdInterface) {
    const userProject: Project | null =
      await this.repository.userHasProject(id);

    if (userProject) {
      throw new ConflictException('The user already has an existing project.');
    }

    return;
  }

  constructor(private readonly repository: RepositoryProject) {}
}
