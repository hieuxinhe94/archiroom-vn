export default {
  name: "menu",
  title: "Menu - Navigation",
  type: "document",
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
      },
      validation: Rule => Rule.required()
    },
    {
      name: "href",
      title: "Href",
      type: "string"
    },
    {
      name: "description",
      title: "Description",
      type: "text"
    },
    {
      name: "isNew",
      title: "isNew",
      type: "boolean"
    },
  ]
};
