export default {
    name: "howToUseBlock",
    title: "How To Use Block",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string"
      },
      {
        name: "howToUseSteps",
        title: "How To Use Steps",
        type: "array",
        of: [{ type: "reference", to: { type: "howToUseStep" } }]
      },
      {
        name: "video",
        title: "Video",
        type: "file"
      },
      {
        name: "buttonActionTitle",
        title: "Action Button Title",
        type: "string"
      }
    ]
  };
  
