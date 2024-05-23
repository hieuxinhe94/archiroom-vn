import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "affliate-page",
  type: "document",
  title: "Affilate Page",
  icon: CogIcon,
  fieldsets: [
    {
      title: "SEO & metadata",
      name: "metadata",
      options: {
        collapsible: true,
        collapsed: false
      }
    },
    {
      title: "Social Media",
      name: "social"
    },
    {
      title: "Website Logo",
      name: "logos",
      options: {
        collapsible: true,
        collapsed: false
      }
    }
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Page title"
    }),

    defineField({
      title: "Main logo",
      description: "Upload your main logo here. SVG preferred. ",
      name: "logo",
      type: "image",
      fieldset: "logos",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessiblity."
        }
      ]
    }),
   
   
    defineField({
      name: "chanels",
      type: "array",
      title: "Chanels",
      description: "Affliate Marketing Chanels",
      
      of: [
        {
          type: "object",
          fields: [
            {
              type: "string",
              name: "media",
              title: "Choose Affliate Marketing Chanel",
              options: {
                list: [
                  { title: "Shopee", value: "shopee" },
                  
                  { title: "Others", value: "others" }
                ]
              }
            },
            {
              type: "text",
              name: "description",
              title: "Description"
            }
          ],
          preview: {
            select: {
              title: "media",
              subtitle: "url"
            }
          }
        }
      ]
    }),

    defineField({
      title: "Meta Description",
      name: "description",
      fieldset: "metadata",
      type: "text",
      rows: 5,
  
      description: "Enter SEO Meta Description"
    }),

    defineField({
      name: "openGraphImage",
      type: "image",
      title: "Open Graph Image",
      description:
        "Image for sharing previews on Facebook, Twitter etc.",
      fieldset: "metadata"
    })
  ]
});
