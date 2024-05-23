export default {
    name: "pricing",
    title: "Pricing",
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
        name: "monthlyPrice",
        title: "Monthly Price",
        type: "string"
      },
      {
        name: "yearlyPrice",
        title: "Yearly Price",
        type: "string"
      },
      {
        name: "features",
        title: "Features",
        type: "array",
        of: [{ type: "string" }]
      }
    ]
  };
  