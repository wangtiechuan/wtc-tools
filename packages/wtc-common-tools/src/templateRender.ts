// 模版{{}}
export function templateRender(
  template = '',
  context: Record<string, any> = {},
) {
  return template.replace(
    /\{\{(.*?)\}\}/g,
    (match, key) => context[key.trim()],
  );
}
