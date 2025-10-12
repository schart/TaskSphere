import { Project } from 'src/models';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
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

  /**
   * Creates a new project for a given user.
   * A user can only have one active project at a time.
   *
   * @param {DtoProjectCreate} body - The data for creating the project.
   * @param {InterfaceUserId} user - The user who owns the project.
   * @returns {Promise<Project>} The created project as a plain object.
   * @throws {ConflictException} If the user already has an active project.
   */
  async create(
    body: DtoProjectCreate,
    user: InterfaceUserId,
  ): Promise<Project> {
    const existing = await this.repository.findByUserId(user);
    if (existing) {
      throw new ConflictException('A user can have only one active project.');
    }

    const project: Project = await this.repository.create({
      ...body,
      ownerId: user._id,
    });

    return project.get({ plain: true });
  }

  /**
   * Updates a project if the user is its owner.
   *
   * @param {DtoProjectUpdate} body - The data to update the project with.
   * @param {InterfaceUserId} user - The user requesting the update.
   * @param {InterfaceProjectId} projectId - The ID of the project to update.
   * @returns {Promise<Project | null>} The updated project or null if not found.
   * @throws {UnauthorizedException} If the user is not the project owner.
   */
  async update(
    body: DtoProjectUpdate,
    user: InterfaceUserId,
    projectId: InterfaceProjectId,
  ): Promise<Project | null> {
    const existing = await this.checkUserOwnerProject(user, projectId);
    if (!existing)
      throw new UnauthorizedException(
        'You must be the owner to update this project.',
      );

    const project: Project | null = await this.repository.update(
      body,
      projectId,
    );

    return project?.get({ plain: true }) || null;
  }

  /**
   * Deletes a project if the user is its owner.
   *
   * @param {InterfaceUserId} user - The user requesting the deletion.
   * @param {InterfaceProjectId} projectId - The ID of the project to delete.
   * @returns {Promise<number>} Number of deleted rows.
   * @throws {UnauthorizedException} If the user is not the project owner.
   */
  async delete(
    user: InterfaceUserId,
    projectId: InterfaceProjectId,
  ): Promise<number> {
    const existing = await this.checkUserOwnerProject(user, projectId);
    if (!existing)
      throw new UnauthorizedException(
        'You must be the owner to delete this project.',
      );

    return this.repository.delete(projectId);
  }

  /**
   * Verifies that a given user owns a project.
   *
   * @param {InterfaceUserId} user - The user to check.
   * @param {InterfaceProjectId} projectId - The project to verify.
   * @returns {Promise<Project | null>} The project if owned by the user, otherwise null.
   */
  async checkUserOwnerProject(
    user: InterfaceUserId,
    projectId: InterfaceProjectId,
  ): Promise<Project | null> {
    return this.repository.checkUserOwnerProject(user, projectId);
  }

  /**
   * Retrieves a project by its ID, including related data.
   *
   * @param {InterfaceProjectId} id - The ID of the project to fetch.
   * @returns {Promise<Project | null>} The found project as a plain object or null if not found.
   * @throws {NotFoundException} If no project is found.
   */
  async getProjectById(id: InterfaceProjectId): Promise<Project | null> {
    const project: Project | null = await this.repository.findByPk(id);
    if (!project) throw new NotFoundException('Project not found');

    return project.get({ plain: true });
  }
}
