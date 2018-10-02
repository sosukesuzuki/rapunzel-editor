import React from 'react'
import styled from 'styled-components'
import 'github-markdown-css'
import remark from 'remark'
import reactRenderer from 'remark-react'
import { convert } from 'tasklist.js'
import { grey } from '../../../lib/colors'
import emoji from 'remark-emoji'
import { observer, inject } from 'mobx-react'
import Stores from '../../../lib/stores'

interface MarkdownRendererProps {
  content: string
  onClickCheckbox: (content: string) => Promise<void>
  setScrollY?: (scrollY: number) => void
  scrollY?: number
  onContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void
  innerRef: (element: HTMLDivElement) => void
  sideNavWidth?: number
}

interface ProgressBarProps {
  percentage: number
}

interface ContainerProps {
  sideNavWidth: number
}

const Container = styled.div`
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
`

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  color: white;
  line-height: 20px;
  background-color: ${grey[2]};
  .inside {
    transition: 0.3s;
    width: ${({ percentage }: ProgressBarProps) => percentage}%;
    background-color: ${grey[5]};
    font-weight: bold;
    text-align: center;
  }
`

@inject((s: Stores) => ({
  setScrollY: s.editorStateStore.setScrollY,
  scrollY: s.editorStateStore.scrollY,
  sideNavWidth: s.editorStateStore.sideNavWidth
}))
@observer
export default class MarkdownRenderer extends React.Component<MarkdownRendererProps> {
  static defaultProps: MarkdownRendererProps = {
    content: '',
    onClickCheckbox: null,
    onContextMenu: null,
    innerRef: null
  }

  componentDidMount () {
    this.prepareCheckbox()
    this.setDefaultCheckbox()
  }

  componentDidUpdate () {
    this.prepareCheckbox()
  }

  getTaskObjects = () => {
    const { content } = this.props
    const contestAst = remark.parse(content)
    const lists = contestAst.children
      .filter(obj => obj.type === 'list')
      .map(obj => obj.children)
    const listItems = Array.prototype.concat.apply([], lists)
    const tasks = listItems.filter(obj => obj.checked !== null)
    return tasks
  }

  getTaskElements = () => document.querySelectorAll('.task-list-item input')

  setDefaultCheckbox = () => {
    const tasks = this.getTaskObjects()
    const taskElements = this.getTaskElements()
    taskElements.forEach((element: HTMLInputElement, i) => element.checked = tasks[i].checked)
  }

  prepareCheckbox = () => {
    const tasks = this.getTaskObjects()
    const taskElements = this.getTaskElements()
    taskElements.forEach((element: HTMLInputElement, i) => {
      element.disabled = false
      element.onchange = () => this.handleClickCheckbox(element, tasks[i].checked)
      element.name = (i + 1).toString()
    })
  }

  handleClickCheckbox = async (element: HTMLInputElement, checked: boolean) => {
    const { content, onClickCheckbox } = this.props
    const newContent = convert(
      content,
      parseInt(element.name, 10),
      !checked
    )
    await onClickCheckbox(newContent)
    this.setDefaultCheckbox()
  }

  handlePreviewScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { setScrollY } = this.props
    setScrollY((e.target as HTMLDivElement).scrollTop)
  }

  render () {
    const { content, innerRef, onContextMenu, sideNavWidth } = this.props
    const tasks = this.getTaskObjects()
    const countOfTasks = tasks.length
    const countOfCompletedTasks = tasks.filter(obj => obj.checked).length
    const percentageOfCompletedTasks = Math.floor(countOfCompletedTasks / countOfTasks * 100)

    return (
      <Container
        sideNavWidth={sideNavWidth}
        className='preview'
        onScroll={this.handlePreviewScroll}
        onContextMenu={onContextMenu}
        innerRef={innerRef}
      >
        {countOfTasks > 0 &&
          <ProgressBar percentage={percentageOfCompletedTasks}>
            <div className='inside'>
              {percentageOfCompletedTasks}%
            </div>
          </ProgressBar>
        }
        <div
          className='markdown-body'
        >
          {remark()
            .use(reactRenderer, {
              sanitize: false
            })
            .use(emoji)
            .processSync(content).contents}
        </div>
      </Container>
    )
  }
}
