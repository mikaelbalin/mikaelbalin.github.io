import { Loader } from "@mantine/core";
import { ReactElement, lazy, createElement, Suspense } from "react";

export default function componentResolver(
  block: {
    __component: string;
    id: string;
    content: string;
  },
  index: number,
): ReactElement {
  // Component names do look like 'category.component-name' => lowercase and kebap case
  const path: string = block.__component.replace(".", "/");

  // The path for dynamic imports cannot be fully dynamic.
  // Webpack requires a static part of the import path at the beginning.
  // All modules below this path will be included in the bundle and be available for dynamic loading.
  // Besides, this will result in code splitting and better performance.
  // See https://webpack.js.org/api/module-methods/#import-1

  // Use react lazy loading to import the module. By convention: The file name needs to match the name of the component (what is a good idea)
  const componentModule = lazy(() =>
    import(`../components/${path}`).catch(() => ({
      default: () => null,
    })),
  );

  // Create react element. The 'type' argument needs to be a FunctionComponent, not a string
  const reactElement = createElement(componentModule, {
    block,
    key: index,
  });

  return (
    <Suspense fallback={<Loader color="blue" />} key={index}>
      {reactElement}
    </Suspense>
  );
}

function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
