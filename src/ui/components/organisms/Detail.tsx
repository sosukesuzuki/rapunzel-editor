import React from 'react'
import styled from 'styled-components'
import { grey } from '../../../lib/colors'
import { observer, inject } from 'mobx-react'
import { CurrentFileStore } from '../../../lib/stores/CurrentFileStore'
import MarkdownRenderer from '../atoms/MarkdownRenderer'
import DetailHeader from '../molecules/DetailHeader'
import { writeFile } from '../../../lib/filesystem/commands/writeFile'
import CodeEditor from '../atoms/CodeEditor'

interface DetaiProps {
  currentFileStore?: CurrentFileStore
}

interface DetailState {
  type: 'editor' | 'preview'
  content: string
}

const Container = styled.div`
  background-color: ${grey[0]};
`

@inject('currentFileStore')
@observer
export default class Detail extends React.Component<DetaiProps, DetailState> {
  constructor (props) {
    super(props)
    const { currentFileStore } = props
    this.state = {
      type: 'preview',
      content: currentFileStore.currentFile == null
        ? ''
        : currentFileStore.currentFile.content
    }
  }

  timer: NodeJS.Timer

  handleOnChange = (e: { target: any }) => {
    const { currentFileStore } = this.props
    const { currentFile } = currentFileStore

    clearTimeout(this.timer)

    this.setContent(e.target.value)

    this.timer = setTimeout(async () => {
      const { content } = this.state
      await writeFile(currentFile.pathname, content)
      console.info('Saved!')
      currentFileStore.setCurrentFile({
        pathname: currentFile.pathname,
        content: content
      })
    }, 1000)
  }

  setType = (type: 'editor' | 'preview') => {
    this.setState({type})
  }

  setContent = (content: string) => this.setState({content})

  switchType = () => {
    const { type } = this.state
    if (type === 'editor') {
      this.setType('preview')
    } else {
      this.setType('editor')
    }
  }

  render () {
    const { currentFileStore } = this.props
    const { type } = this.state
    return (
      <Container>
        {currentFileStore.currentFile != null &&
          <>
            <DetailHeader
              type={type}
              handleClickEditorButton={this.switchType.bind(this)}
              pathname={currentFileStore.currentFile == null
                ? ''
                : currentFileStore.currentFile.pathname} />
            { type === 'preview'
              ? <MarkdownRenderer
                  content={currentFileStore.currentFile == null
                    ? ''
                    : currentFileStore.currentFile.content} />
              : <CodeEditor
                  value={currentFileStore.currentFile == null
                    ? ''
                    : currentFileStore.currentFile.content}
                  onChange={(e: { target: any }) => this.handleOnChange(e)} />
            }
          </>
        }
      </Container>
    )
  }
}
