import { JSCodeshift, types } from "jscodeshift";

export function findJSXElementsByNamedImport(
  j: JSCodeshift,
  importName: string,
  exportName: string
) {
  return this.find(types.namedTypes.ImportDeclaration, {
    source: { value: importName },
  })
    .find(types.namedTypes.ImportSpecifier, {
      imported: { name: exportName },
    })
    .map((path) => {
      const id = path.node.local.name;
      console.log(id);

      if (id) {
        return j([path]).closestScope().findJSXElements(id).paths();
      }
    });
}
