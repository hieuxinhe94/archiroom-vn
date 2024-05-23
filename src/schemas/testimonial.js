export default {
    name: "testimonial",
    title: "Testimonial",
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
        type: "text",
        rows: 8,
        validation: Rule => Rule.max(400)
      },
      {
        name: "thumbnail",
        title: "Thumbnail",
        type: "image"
      },
      {
        name: "avatar",
        title: "Customer Avatar",
        type: "image"
      },
      {
        name: "customerInfo",
        title: "Customer Information",
        description: "e.g Admin - 11 Nov, 2023",
        type: "string"
      },
    ]
  };
  