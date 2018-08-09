import React from 'react'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'
import 'github-markdown-css'

interface MarkdownRendererProps {
  content: string
}

export default class MarkdownRenderer extends React.Component<MarkdownRendererProps> {
  static defaultProps: MarkdownRendererProps = { content: '' }
  element: Element = null

  componentDidMount () {
    this.highlightCode()
  }

  componentDidUpdate () {
    this.highlightCode()
  }

  highlightCode = () => {
    const nodes = this.element.querySelectorAll('pre code')
    for (let i = 0; i < nodes.length; i++) {
      console.log(nodes[i])
      hljs.highlightBlock(nodes[i])
    }
  }

  setElement = (element: Element) => this.element = element

  render () {
    const { content } = this.props
    const renderer = new marked.Renderer()
    renderer.link = (href, title, text) => (
      `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${title}">${text}</a>`
    )
    renderer.code = (code, lang) => (
      `<pre><code>${code}</code></pre>`
    )
    const html = marked(content, { renderer })

    return (
      <div
        className='markdown-body'
        ref={this.setElement}
        dangerouslySetInnerHTML={{
          __html: html
        }}
      />
    )
  }
}