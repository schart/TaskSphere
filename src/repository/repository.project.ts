import { Project } from 'src/models';
import { Injectable } from '@nestjs/common';
import { Repository } from './repository.base';
import type {
  TypeProjectModel,
  InterfaceProjectId,
  InterfaceProjectUpdate,
} from 'src/structures/types/type.project';
import { InjectModel } from '@nestjs/sequelize';
import { InterfaceUserId } from 'src/structures';
import { Sequelize } from 'sequelize-typescript';
import sequelize from 'sequelize';

@Injectable()
export class RepositoryProject extends Repository<Project> {
  async create(InterfaceProjectCreation: any): Promise<Project> {
    return await this.model.create(InterfaceProjectCreation);
  }

  async update(
    updateInterface: InterfaceProjectUpdate,
    { _id }: InterfaceProjectId,
  ): Promise<any | Project> {
    const [_, affectedRows] = await this.model.update(
      {
        ...updateInterface,
      },
      {
        where: {
          id: _id,
        },
        returning: true,
      },
    );
    let updatedUserResult = !affectedRows ? null : affectedRows[0].dataValues;
    return updatedUserResult;
  }

  async find(): Promise<Project[] | null> {
    return this.model.findAll();
  }

  async findByPk({ _id }: InterfaceProjectId): Promise<Project | null> {
    return await this.model.findByPk(_id);
  }

  async findByUserId({ _id }: InterfaceUserId): Promise<Project | null> {
    return await this.model.findOne({
      where: {
        ownerId: _id,
      },
    });
  }

  async deleteWithOwnTasks(
    { _id }: InterfaceProjectId,
    tx: sequelize.Transaction,
  ) {
    await this.model.destroy({
      where: {
        id: _id,
      },
      transaction: tx,
    });

    // delete tasks in here

    tx.commit();
  }

  constructor(
    @InjectModel(Project) private readonly model: TypeProjectModel,
    private readonly sequelize: Sequelize,
  ) {
    super();
  }
}
