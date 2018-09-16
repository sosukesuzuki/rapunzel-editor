import React from 'react'
import 'github-markdown-css'
import remark from 'remark'
import reactRenderer from 'remark-react'
import { convert } from 'tasklist.js'

interface MarkdownRendererProps {
  content: string
  onClickCheckbox: (content: string) => Promise<void>
}

export default class MarkdownRenderer extends React.Component<MarkdownRendererProps> {
  static defaultProps: MarkdownRendererProps = {
    content: '',
    onClickCheckbox: null
  }

  element: HTMLDivElement

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
