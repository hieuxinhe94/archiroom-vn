export default {
    name: "pricingBlock",
    title: "Pricing Block",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string"
      },
      {
        name: "prices",
        title: "Prices",
        type: "array",
        of: [{ type: "reference", to: { type: "pricing" } }]
      }
    ]
  };
  