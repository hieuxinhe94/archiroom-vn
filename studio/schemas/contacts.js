export default {
  name: "contacts",
  title: "contacts",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "name",
      title: "name",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "email",
      title: "email",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "phone",
      title: "phone",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "company",
      title: "company",
      type: "string",
    },
    {
      name: "content",
      title: "content",
      type: "string",
    },
  ]
};
