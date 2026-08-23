export const toStateKey = (path: string) =>
  path
    .split('src/')
    .slice(1)
    .join('')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word: string, index: number) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\W+/g, '');
