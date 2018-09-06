import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { CurrentFileStore } from '../../../lib/stores/CurrentFileStore'
import MarkdownRenderer from '../organisms/MarkdownRenderer'
import DetailHeader from '../molecules/DetailHeader'
import { writeFile } from '../../../lib/filesystem/commands'
import CodeEditor from '../organisms/CodeEditor'

interface DetaiProps {
  currentFileStore?: CurrentFileStore
  sideNavWidth: number
  toggleIsHiddenSideNav: () => void
}

interface DetailState {
  type: 'editor' | 'preview'
  content: string
}

interface ContainerProps {
  sideNavWidth: number
}

const Container = styled.div`
  background-color: white;
  display: grid;
  grid-template-rows: 32px 1fr;
  .edit {
    max-width: calc(100vw - ${({ sideNavWidth }: ContainerProps) => sideNavWidth}px - 1px);
    max-height: calc(100vh - 65px);
    overflow-y: auto;
    .CodeMirror {
      bottom: 0;
      z-index: 0;
      font-family: 'mono';
      min-height: calc(100vh - 65px);
    }
  }
  .preview {
    padding: 0 10px;
    overflow-y: auto;
    max-height: calc(100vh - 65px);
    max-width: calc(100vw - ${({ sideNavWidth }: ContainerProps) => sideNavWidth}pxpx - 1px);
    .markdown-body {
      padding: 45px;
      p {
        white-space: pre-wrap;
      }
      pre code {
        white-space: pre;
        font-family: 'mono';
      }
    }
  }
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
    this.setState({ type })
  }

  setContent = (content: string) => this.setState({ content })

  switchType = () => {
    const { type } = this.state
    if (type === 'editor') {
      this.setType('preview')
    } else {
      this.setType('editor')
    }
  }

  hanldeOnContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    this.switchType()
  }

  render () {
    const { currentFileStore, sideNavWidth, toggleIsHiddenSideNav } = this.props
    const { type } = this.state
    return (
      <Container sideNavWidth={sideNavWidth}>
        {currentFileStore.currentFile != null &&
          <>
            <DetailHeader
              type={type}
              handleClickEditorButton={this.switchType.bind(this)}
              toggleIsHiddenSideNav={toggleIsHiddenSideNav}
              fileContent={currentFileStore.currentFile == null
                ? ''
                : currentFileStore.currentFile.content}
              pathname={currentFileStore.currentFile == null
                ? ''
                : currentFileStore.currentFile.pathname} />
            { type === 'preview'
              ? <div className='preview' onContextMenu={this.hanldeOnContextMenu}>
                <MarkdownRenderer
                  content={currentFileStore.currentFile == null
                    ? ''
                    : currentFileStore.currentFile.content} />
              </div>
              : <div className='edit' onContextMenu={this.hanldeOnContextMenu}>
                <CodeEditor
                  value={currentFileStore.currentFile == null
                    ? ''
                    : currentFileStore.currentFile.content}
                  onChange={(e: { target: any }) => this.handleOnChange(e)} />
              </div>
            }
          </>
        }
      </Container>
    )
  }
}
