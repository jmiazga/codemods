import { Transform } from "jscodeshift";
import { findJSXElementsByNamedImport } from "./custom-methods";

const transformer: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  j.registerMethods({ findJSXElementsByNamedImport });

  root
    .findJSXElementsByNamedImport(j, "@chakra-ui/core", "Button")
    .find(j.JSXIdentifier, {
      name: "variantColor",
    })
    .replaceWith((nodePath) => {
      const { node } = nodePath;

      return j.identifier("colorScheme");
    });

  return root.toSource();
};

export default transformer;
