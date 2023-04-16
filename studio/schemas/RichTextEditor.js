// RichTextEditor.js
import React from 'react'

const HighlightIcon = () => (
  <span style={{ fontWeight: 'bold' }}>H</span>
)
const HighlightDecorator = props => (
  <span style={{ backgroundColor: 'yellow' }}>{props.children}</span>
)

export default {
  name: 'content',
  title: 'Content',
  type: 'array',
  of: [
    {
      type: 'block',
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          {
            title: 'Highlight',
            value: 'highlight',
            icon: HighlightIcon,
            component: HighlightDecorator
          }
        ]
      }
    }
  ]
}