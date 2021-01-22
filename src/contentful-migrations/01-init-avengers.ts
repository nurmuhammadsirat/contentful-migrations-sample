import { MigrationFunction } from "contentful-migration";

const createAvengersContentModel: MigrationFunction = migration => {
  const avengers = migration.createContentType("avengers", {
    name: "Avengers",
    displayField: "avengers"
  });

  avengers
    .createField("name")
    .name("Name")
    .type("Text")
    .required(true);

  avengers
    .createField("powers")
    .name("Powers")
    .type("RichText")
    .required(true)
    .validations([
      {
        enabledMarks: ["bold", "italic"],
        message: "Only bold and italic marks are allowed"
      },
      {
        enabledNodeTypes: ["hyperlink", "unordered-list", "ordered-list"],
        message: "Only link to Url, unordered list, and ordered list nodes are allowed"
      },
      {
        nodes: {}
      }
    ]);

  avengers
    .createField("heroSite")
    .name("Hero Website")
    .type("Link")
    .linkType("Entry")
    .required(false);

  avengers
    .createField("categoryTag")
    .name("Power Category Tag")
    .type("Symbol")
    .required(true)
    .validations([
      {
        in: ["Super Strength", "Super Agile", "Flight"]
      }
    ]);

  avengers.changeFieldControl("powers", "builtin", "multipleLine");
  avengers.changeFieldControl("categoryTag", "builtin", "dropdown");
};

export = function(migration) {
  createAvengersContentModel(migration);
} as MigrationFunction;
