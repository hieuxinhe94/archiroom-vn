export default {
  name: "feedback",
  title: "Feedback",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Name",
      type: "string"
    },
    {
      name: "description",
      title: "Short info",
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
      name: "mainImage",
      title: "Main image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessiblity.",
          options: {
            isHighlighted: true
          }
        }
      ],
      options: {
        hotspot: true
      }
    },
    {
      name: "content",
      title: "Description",
      type: "text"
    }
  ]
};
