export function fillTemplate(
  template: string,
  variables: Record<string, string>,
): string {
  let filled = template;

  for (const key in variables) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    filled = filled.replace(regex, variables[key]);
  }

  return filled;
}
