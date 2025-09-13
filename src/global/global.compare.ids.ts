import { UserIdInterface } from 'src/structures';

export function compareIds(
  { _id: id1 }: UserIdInterface,
  { _id: id2 }: UserIdInterface,
): boolean {
  if (id1 !== id2) {
    return false;
  }

  return true;
}
