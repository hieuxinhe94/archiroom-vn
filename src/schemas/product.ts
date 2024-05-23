import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'affliate-product',
  title: 'Affliate Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
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
      type: "url",
      name: "url",
      title: "Url"
    },
    {
      type: "text",
      name: "name",
      rows: 1,
      title: "Product Name"
    },
    {
      type: "number",
      name: "discount",
      title: "discount"
    },
    {
      type: "number",
      name: "totalSale",
      title: "totalSale"
    },
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    {
      type: "number",
      name: "price",
      title: "Price"
    },
    {
      type: "number",
      name: "ratingAmount",
      title: "Rating Amount"
    },
    {
      type: "number",
      name: "ratingNumber",
      title: "Rating Number",
      description: "From 1 to 5. E.g: 4.5"
    },
    {
      type: "string",
      name: "type",
      title: "Clothes Type",
      options: {
        list: [
          { title: "Shirts", value: "shirts" },
          { title: "Jeans", value: "jeans" },
          { title: "Dress", value: "dress" }
        ]
      }
    }
  ]   
})
