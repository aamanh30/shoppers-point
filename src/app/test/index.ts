import fs from 'fs';
(async () => {
  const directoryPath = `C:/Users/Admin/Desktop/the-confused-developer/typescript-practice/src/assets/`;
  const filePaths = fs
    .readdirSync(directoryPath)
    .map(fileName => `${directoryPath}${fileName}`);
  filePaths.forEach(filePath => {
    const contentString = fs.readFileSync(filePath, 'utf-8');
    const content = JSON.parse(contentString).map(
      ({ uiMapping, ...content }) => {
        return JSON.stringify({ ...content, props: uiMapping });
      }
    );
    const fileName = filePath
      .substring(filePath.lastIndexOf('/' + 1))
      .substring(0, filePath.indexOf('.'));

    const tsCode = `
       export type Content = ${Object.keys(content[0]).reduce(
         (TContent, key) => {
           return {
             ...TContent,
             [key]: typeof TContent[key]
           };
         },
         {}
       )}
       const file: string = '${fileName}.ts';
       export const config: FormlyConfig[] = [${content}]
    `;

    fs.writeFileSync(`${fileName}.ts`, tsCode);
  });
})();
