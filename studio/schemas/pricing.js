export default {
  name: "pricing",
  title: "Pricing",
  type: "document",
  initialValue: () => ({
    publishedAt: new Date().toISOString()
  }),
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      name: "isCheck",
      title: "Current?",
      type: "boolean"
    },
    {
      name: "plans",
      title: "Plans",
      type: "array",
      of: [{ type: "reference", to: { type: "pricing_plan" } }]
    },
  ]
};
