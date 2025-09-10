import { Models } from 'src/structures/types/type.models';

export abstract class Repository<T extends Models> {
  abstract find(): Promise<T[] | null>; // Retrieve all
  abstract findByPk(id: any): Promise<T | null>; // Retrieve one
  abstract create(creationInterface: any): Promise<T>; // Create One
  abstract update(updateInterface: any, id: number): Promise<T | any>; // Update One
}
