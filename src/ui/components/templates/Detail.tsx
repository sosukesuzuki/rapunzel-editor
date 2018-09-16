import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { CurrentFileStore } from '../../../lib/stores/CurrentFileStore'
import MarkdownRenderer from '../organisms/MarkdownRenderer'
import DetailHeader from '../molecules/DetailHeader'
import { writeFile } from '../../../lib/filesystem/commands'
import CodeEditor from '../organisms/CodeEditor'
import { EditorStateStore } from '../../../lib/stores/EditorStateStore'

interface DetaiProps {
  currentFileStore?: CurrentFileStore
  editorStateStore?: EditorStateStore
}

interface DetailState {
  type: 'editor' | 'preview'
  content: string
}

interface ContainerProps {
  sideNavWidth: number
  isHiddenSideNav: boolean
}

const Container = styled.div`
  background-color: white;
  display: grid;
  grid-template-rows: 32px 1fr;
  .edit {
    max-width: calc(100vw - ${({ sideNavWidth, isHiddenSideNav }: ContainerProps) => (
      !isHiddenSideNav
        ? `${sideNavWidth}px - 1px`
        : '0x'
    )});
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
    overflow-y: auto;
    max-height: calc(100vh - 65px);
    max-width: calc(100vw - ${({ sideNavWidth }: ContainerProps) => sideNavWidth}pxpx - 1px);
    .markdown-body {
      padding: 45px;
      h1:first-child {
        margin-top: 0;
      }
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

@inject('editorStateStore')
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

  handleClickCheckbox = async (content) => {
    const { currentFileStore } = this.props
    const { currentFile } = currentFileStore

    await writeFile(currentFile.pathname, content)
    currentFileStore.setCurrentFile({
      pathname: currentFile.pathname,
      content: content
    })
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
    const { currentFileStore, editorStateStore } = this.props
    const { type } = this.state
    const { sideNavWidth, isHiddenSideNav } = editorStateStore

    return (
      <Container
        sideNavWidth={sideNavWidth}
        isHiddenSideNav={isHiddenSideNav}>
        {currentFileStore.currentFile != null &&
          <>
            <DetailHeader
              type={type}
              handleClickEditorButton={this.switchType.bind(this)}
              fileContent={currentFileStore.currentFile == null
                ? ''
                : currentFileStore.currentFile.content}
              pathname={currentFileStore.currentFile == null
                ? ''
                : currentFileStore.currentFile.pathname} />
            { type === 'preview'
              ? <div className='preview' onContextMenu={this.hanldeOnContextMenu}>
                <MarkdownRenderer
                  onClickCheckbox={this.handleClickCheckbox}
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
