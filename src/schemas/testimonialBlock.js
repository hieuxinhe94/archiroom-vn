export default {
    name: "testimonialBlock",
    title: "Testimonial Block",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string"
      },
      {
        name: "testimonials",
        title: "Testimonials",
        type: "array",
        of: [{ type: "reference", to: { type: "testimonial" } }]
      }
    ]
  };
  