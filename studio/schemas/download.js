export default {
  name: "download",
  title: "Download Section",
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
      name: "secondImage",
      title: "Secondary image",
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
      name: "enablePlaystore",
      title: "Enable Playstore?",
      type: "boolean"
    }, {
      name: "enableAppstore",
      title: "Enable Appstore?",
      type: "boolean"
    },
    {
      name: "container_size",
      title: "Container Size",
      type: "string",
      description: "Size of section",
      options: {
        list: [
          { title: "w-3/4", value: "w-3/4" },
          { title: "w-full", value: "w-full" }
        ]
      }
    },
  ]
};
