import React from 'react'
import marked from 'marked'
import 'github-markdown-css'

interface MarkdownRendererProps {
  content: string
}

export default class MarkdownRenderer extends React.Component<MarkdownRendererProps> {
  static defaultProps: MarkdownRendererProps = { content: '' }

  render () {
    const { content } = this.props
    const renderer = new marked.Renderer()
    renderer.link = (href, title, text) => (
      `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${title}">${text}</a>`
    )
    const html = marked(content, { renderer })

    return (
      <div
        className='markdown-body'
        dangerouslySetInnerHTML={{
          __html: html
        }}
      />
    )
  }
}
