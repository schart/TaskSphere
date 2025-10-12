import { Optional } from 'sequelize';
import { Project } from 'src/models';

export interface InterfaceProjectAttributes {
  _id?: number;
  ownerId?: number;
  title?: string;
  description?: string;
}

export interface InterfaceProjectId
  extends Pick<InterfaceProjectAttributes, '_id'> {}

export interface InterfaceProjectCreation
  extends Optional<InterfaceProjectAttributes, '_id'> {}

export interface InterfaceProjectUpdate
  extends Pick<InterfaceProjectAttributes, 'title' | 'description'> {}
