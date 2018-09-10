import React from 'react'
import 'github-markdown-css'
import remark from 'remark'
import reactRenderer from 'remark-react'

interface MarkdownRendererProps {
  content: string
}

export default class MarkdownRenderer extends React.Component<MarkdownRendererProps> {
  static defaultProps: MarkdownRendererProps = { content: '' }

  element: HTMLDivElement

  render () {
    const { content } = this.props

    return (
      <div className='markdown-body'>
        {remark().use(reactRenderer, {
          sanitize: false
        }).processSync(content).contents}
      </div>
    )
  }
}
