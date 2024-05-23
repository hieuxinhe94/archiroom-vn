export default {
    name: "intro-block",
    title: "Introduction Block",
    type: "document",
    fields: [
      {
        name: "subTitle",
        title: "Sub Title",
        type: "string",
        options: {
          maxLength: 50
        }
      },
      {
        name: "title",
        title: "Main Title",
        type: "string",
        options: {
          maxLength: 100
        }
      },
      {
        name: "video",
        title: "Introduction Video",
        type: "file",
        options: {
          hotspot: true
        }
      },
      {
        name: "callToActionBtn",
        title: "Call-To-Action Button Title",
        type: "string",
        options: {
          maxLength: 30
        }
      },
      {
        name: "description",
        title: "Description",
        type: "text",
        rows: 8,
        validation: Rule => Rule.max(400)
      },
    ]
  };
  