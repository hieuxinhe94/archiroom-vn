export default {
    name: "featureBlock",
    title: "Feature Block",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string"
      },
      {
        name: "description",
        title: "Description",
        type: "string"
      },
      {
        name: "features",
        title: "Features",
        type: "array",
        of: [{ type: "reference", to: { type: "feature" } }]
      }
    ]
  };
  
