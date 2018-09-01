import React from 'react'
import marked from 'marked'
import katex from 'katex'
import 'github-markdown-css'
import 'katex/dist/katex.min.css'
import '../../katex-fonts.css'

interface MarkdownRendererProps {
  content: string
}

export default class MarkdownRenderer extends React.Component<MarkdownRendererProps> {
  static defaultProps: MarkdownRendererProps = { content: '' }

  element: HTMLDivElement

  render () {
    const { content } = this.props
    const renderer = new marked.Renderer()
    renderer.link = (href, title, text) => (
      `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${title}">${text}</a>`
    )
    renderer.code = (code, lang, isEscaped) => {
      if (lang === 'math') {
        return `<object class="math">${katex.renderToString(code, { displayMode: true })}</math>`
      } else {
        return `<pre><code>${code}</code></pre>`
      }
    }
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
