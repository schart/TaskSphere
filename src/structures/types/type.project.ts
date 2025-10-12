import { Optional } from 'sequelize';
import { Project } from 'src/models';

export interface InterfaceProjectAttributes {
  _id?: string;
  ownerId?: string;
  title?: string;
  description?: string;
}

export interface InterfaceProjectId
  extends Pick<InterfaceProjectAttributes, '_id'> {}

export interface InterfaceProjectCreation
  extends Optional<InterfaceProjectAttributes, '_id'> {}

export interface InterfaceProjectUpdate
  extends Pick<InterfaceProjectAttributes, 'title' | 'description'> {}

export type TypeProjectModel = typeof Project & { new (): Project };
