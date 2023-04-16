export default {
  name: "search_result",
  title: "Search Result",
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
      }
    },
    {
      name: "source",
      title: "Source",
      type: "reference",
      to: { type: "author" }
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
      name: "body",
      title: "Body",
      type: "blockContent"
    }
  ],
};
