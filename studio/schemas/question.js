export default {
  name: "question",
  title: "Question",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "answer",
      title: "Answer",
      type: "string",
      validation: Rule => Rule.required()
    },
  ]
};
