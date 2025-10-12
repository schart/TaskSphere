import type {
  TypeProjectModel,
  InterfaceProjectId,
  InterfaceProjectUpdate,
  InterfaceProjectCreation,
} from 'src/structures/types/type.project';
import { Project, Task } from 'src/models';
import { Injectable } from '@nestjs/common';
import { Repository } from './repository.base';
import { InjectModel } from '@nestjs/sequelize';
import { InterfaceUserId } from 'src/structures';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class RepositoryProject extends Repository<Project> {
  /**
   * Creates a new project.
   *
   * @param {InterfaceProjectCreation} projectData - The data required to create a project.
   * @returns {Promise<Project>} The newly created project.
   */
  async create(projectData: InterfaceProjectCreation): Promise<Project> {
    return this.model.create(projectData as any);
  }

  /**
   * Updates a project by ID.
   *
   * @param {InterfaceProjectUpdate} updateData - The fields to update.
   * @param {InterfaceProjectId} projectId - The ID of the project to update.
   * @returns {Promise<Project | null>} The updated project, or null if not found.
   */
  async update(
    updateData: InterfaceProjectUpdate,
    { _id }: InterfaceProjectId,
  ): Promise<Project | null> {
    const [updatedCount, updatedRows] = await this.model.update(updateData, {
      where: { id: _id },
      returning: true,
    });

    if (updatedCount === 0) {
      return null;
    }

    return updatedRows[0];
  }

  /**
   * Deletes a project by ID
   * @param {InterfaceProjectId} projectId - The ID of the project to delete
   * @returns {number} - Number of the deleted count
   */
  async delete({ _id }: InterfaceProjectId): Promise<number> {
    const tx = await this.sequelize.transaction();
    try {
      // Delete task of project
      await this.taskModel.destroy({
        where: { id: _id },
        transaction: tx,
      });

      // Delete project itself
      const deletedCount = await this.model.destroy({
        where: { id: _id },
        transaction: tx,
      });

      tx.commit();
      return deletedCount;
    } catch (error) {
      if (tx) await tx.rollback();
      throw error;
    }
  }

  /**
   * Checks if a given user is the owner of a specific project.
   *
   * @param {InterfaceUserId} user - The user object containing the user ID.
   * @param {InterfaceProjectId} project - The project object containing the project ID.
   * @returns {Promise<Project | null>} The project if the user is the owner, otherwise null.
   */
  async checkUserOwnerProject(
    { _id: userId }: InterfaceUserId,
    { _id: projectId }: InterfaceProjectId,
  ): Promise<Project | null> {
    return this.model.findOne({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });
  }

  /**
   * Finds All project
   * @returns {Promise<Project | null>} - The updated project, or null if not found.
   */
  async find(): Promise<Project[] | null> {
    return this.model.findAll();
  }

  /**
   * Finds a project by ID
   * @param {InterfaceProjectId} projectId - The ID of the project to delete
   * @returns {Promise<Project | null>} - The found project, or null if not found.
   */
  async findByPk({ _id }: InterfaceProjectId): Promise<Project | null> {
    return await this.model.findByPk(_id);
  }

  /**
   * @param {InterfaceProjectId} projectId - The ID of the project to delete
   * @returns {Promise<Project | null>} - The found project, or null if not found.
   */
  findByUserId({ _id }: InterfaceUserId): Promise<Project | null> {
    return this.model.findOne({
      where: {
        ownerId: _id,
      },
    });
  }

  constructor(
    @InjectModel(Project) private readonly model: TypeProjectModel,
    @InjectModel(Task) private readonly taskModel: typeof Task,
    private readonly sequelize: Sequelize,
  ) {
    super();
  }
}
