import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import Stores from '../../../lib/stores'
import MarkdownRenderer from '../organisms/MarkdownRenderer'
import DetailHeader from '../molecules/DetailHeader'
import { writeFile } from '../../../lib/filesystem/commands'
import CodeEditor from '../organisms/CodeEditor'
import { File } from '../../../lib/types'

interface DetailProps {
  currentFile?: File
  setCurrentFile?: (input: File) => Promise<void>
  sideNavWidth?: number
  isHiddenSideNav?: boolean
  setScrollY?: (scrollY: number) => void
  scrollY?: number
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

@inject((s: Stores) => ({
  currentFile: s.currentFileStore.currentFile,
  setCurrentFile: s.currentFileStore.setCurrentFile,
  sideNavWidth: s.editorStateStore.sideNavWidth,
  isHiddenSideNav: s.editorStateStore.isHiddenSideNav,
  setScrollY: s.editorStateStore.setScrollY,
  scrollY: s.editorStateStore.scrollY
}))
@observer
export default class Detail extends React.Component<DetailProps, DetailState> {
  constructor (props: DetailProps) {
    super(props)
    const { currentFile } = props
    this.state = {
      type: 'preview',
      content: currentFile != null ? currentFile.content : ''
    }
  }

  timer: NodeJS.Timer
  previewElement: HTMLDivElement

  handleOnChange = (e: { target: any }) => {
    const { setCurrentFile, currentFile } = this.props

    clearTimeout(this.timer)

    this.setContent(e.target.value)

    this.timer = setTimeout(async () => {
      const { content } = this.state
      await writeFile(currentFile.pathname, content)
      console.info('Saved!')
      setCurrentFile({
        pathname: currentFile.pathname,
        content: content
      })
    }, 1000)
  }

  handleClickCheckbox = async (content) => {
    const { currentFile, setCurrentFile } = this.props

    await writeFile(currentFile.pathname, content)
    setCurrentFile({
      pathname: currentFile.pathname,
      content: content
    })
  }

  setType = (type: 'editor' | 'preview', callBack: () => void = () => { return }) => {
    this.setState({ type }, callBack)
  }

  setContent = (content: string) => this.setState({ content })

  switchType = () => {
    const { type } = this.state
    const { scrollY } = this.props
    if (type === 'editor') {
      this.setType('preview', () => this.previewElement.scrollTop = scrollY)
    } else {
      this.setType('editor')
    }
  }

  handleOnContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    this.switchType()
  }

  handlePreviewScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { setScrollY } = this.props
    setScrollY((e.target as HTMLDivElement).scrollTop)
  }

  render () {
    const { currentFile, sideNavWidth, isHiddenSideNav } = this.props
    const { type } = this.state
    const content = currentFile && currentFile.content
    const pathname = currentFile && currentFile.pathname

    return (
      <Container
        sideNavWidth={sideNavWidth}
        isHiddenSideNav={isHiddenSideNav}>
        {currentFile != null &&
          <>
            <DetailHeader
              type={type}
              handleClickEditorButton={this.switchType.bind(this)}
              fileContent={content}
              pathname={pathname}
            />
            { type === 'preview'
              ? (
                <MarkdownRenderer
                  innerRef={element => this.previewElement = element}
                  onContextMenu={this.handleOnContextMenu}
                  onClickCheckbox={this.handleClickCheckbox}
                  content={content}
                />
              )
              : (
                <CodeEditor
                  value={content}
                  onChange={(e: { target: any }) => this.handleOnChange(e)}
                  onContextMenu={this.handleOnContextMenu}
                />
              )
            }
          </>
        }
      </Container>
    )
  }
}
