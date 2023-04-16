export default {
  name: "pricing_plan",
  title: "PricingPlan",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true
      }
    },
    {
      name: "nonActive",
      title: "Just non active?",
      type: "boolean"
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
      name: "description",
      title: "Description",
      type: "string"
    },
    {
      name: "cost",
      title: "Cost",
      type: "string"
    },
    {
      name: "cost_in_grade",
      title: "per Month/Year",
      type: "string",
      options: {
        list: [
          { title: "Month", value: "month" },
          { title: "Year", value: "year" },
        ]
      }
    },
    {
      name: "btnLabel",
      title: "Button Label",
      type: "string"
    },
    {
      name: "btnLink",
      title: "Button Link",
      type: "string"
    },
    {
      name: "isFeature1",
      title: "Feature1?",
      type: "boolean"
    },
    {
      name: "isFeature2",
      title: "Feature2?",
      type: "boolean"
    },
    {
      name: "isFeature3",
      title: "Feature3?",
      type: "boolean"
    },
    {
      name: "isFeature4",
      title: "Feature4?",
      type: "boolean"
    },
    {
      name: "isFeature5",
      title: "Feature5?",
      type: "boolean"
    },
  ]
};
