export default {
    name: "howItWorkBlock",
    title: "How It Works Block",
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
        name: "howitworksitems",
        title: "How it works items",
        type: "array",
        of: [{ type: "reference", to: { type: "howitworks" } }]
      }
    ]
  };
  
