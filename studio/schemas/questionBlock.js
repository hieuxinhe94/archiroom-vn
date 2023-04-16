export default {
  name: "questionBlock",
  title: "Frequently QA Section",
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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      name: "questions",
      title: "Questions",
      type: "array",
      of: [{ type: "reference", to: { type: "question" } }]
    },
  ]
};
