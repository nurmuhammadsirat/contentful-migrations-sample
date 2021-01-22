import { MigrationFunction } from "contentful-migration";

export = function(migration) {
  const locations = [
    "USA",
    "UK",
    "Russia",
    "China",
    "Other Unimportant Country Where Superheroes Do Not Exist Ever"
  ];

  const faqs = migration.editContentType("avengers");

  faqs
    .createField("currentLocation")
    .name("Current Location")
    .required(true)
    .type("Array")
    .localized(false)
    .items({
      type: "Symbol",
      validations: [
        {
          in: locations
        }
      ]
    });

  faqs.changeFieldControl("location", "builtin", "checkbox");

  // set locations for existing avengers
  migration.transformEntries({
    contentType: "avengers",
    from: [],
    to: ["location"],
    transformEntryForLocale: () => {
      return { location: locations };
    },
    shouldPublish: false
  });
} as MigrationFunction;
