import { InterfaceUserId } from 'src/structures';

export function compareIds(
  { _id: id1 }: InterfaceUserId,
  { _id: id2 }: InterfaceUserId,
): boolean {
  if (id1 !== id2) {
    return false;
  }

  return true;
}
