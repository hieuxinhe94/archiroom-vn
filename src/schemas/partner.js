export default {
    name: "partner",
    title: "Partner",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Logo Name",
            type: "string"
        },
        {
            name: "logo",
            title: "Partner Logo",
            type: "image",
            fields: [
              {
                name: "alt",
                type: "string",
                title: "Partner Logo Alt",
                description: "Important for SEO and accessiblity."
              }
            ],
        },
      {
        name: "isActive",
        title: "Active",
        type: "boolean"
      }
    ]
  };
  