export default function plopGenerator(plop) {
  plop.setGenerator("component", {
    description: "Application component logic",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "component name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/components/{{pascalCase name}}/index.ts",
        templateFile: "templates/component/index.ts.hbs",
      },
      {
        type: "add",
        path: "../src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/component/component.tsx.hbs",
      },
      {
        type: "add",
        path: "../src/components/{{pascalCase name}}/{{pascalCase name}}.props.ts",
        templateFile: "templates/component/props.ts.hbs",
      },
    ],
  });
  plop.setGenerator("Childless component", {
    description: "Application logic for childless component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "component name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/components/{{pascalCase name}}/index.ts",
        templateFile: "templates/childless-component/index.ts.hbs",
      },
      {
        type: "add",
        path: "../src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/childless-component/component.tsx.hbs",
      },
    ],
  });
  plop.setGenerator("page", {
    description: "Application page logic",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "page name (Page suffix will be automatically added)",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../src/pages/{{pascalCase name}}Page/index.ts",
        templateFile: "templates/page/index.ts.hbs",
      },
      {
        type: "add",
        path: "../src/pages/{{pascalCase name}}Page/{{pascalCase name}}Page.tsx",
        templateFile: "templates/page/component.tsx.hbs",
      },
    ],
  });
}
