export default {
    name: "two-columns-block",
    title: "Two Colums Block",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string"
      },
      {
        name: "subTitle",
        title: "Sub Title",
        type: "string"
      },
      {
        name: "description",
        title: "Description",
        type: "text",
        rows: 8,
        validation: Rule => Rule.max(400)
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
        name: "images",
        title: "Images",
        type: "array",
        of: [{ type: "image" }]
      },
      {
        name: "ltr",
        title: "Left to Right",
        type: "boolean",
        initialValue: true
      },
      {
        name: "mainBtn",
        title: "Main Button Title",
        type: "string"
      },
      {
        name: "subBtn",
        title: "Sub Button Title",
        type: "string"
      },
      {
        name: "showSubBtn",
        title: "Show Sub Button",
        type: "boolean",
        initialValue: true
      },
    ]
  };
  