import React from 'react'
import * as monaco from 'monaco-editor'

const options = {}

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
}

export default class CodeEditor extends React.Component<CodeEditorProps> {
  containerElement: HTMLDivElement
  disableHandleChange: boolean = false
  editor: monaco.editor.IStandaloneCodeEditor

  get value () {
    return this.editor.getValue()
  }

  componentDidMount () {
    this.initMoncao()
  }

  editorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editor.onDidChangeModelContent((event: any) => {
      const value = editor.getValue()
      this.handleChange(value)
    })
  }

  initMoncao = () => {
    const { value } = this.props
    if (this.containerElement == null) return
    this.editor = monaco.editor.create(this.containerElement, {
      value,
      ...options
    })
    this.editorDidMount(this.editor)
  }

  handleChange = (value: string) => {
    const { onChange } = this.props
    onChange(value)
  }

  render () {
    return (
      <div
        ref={element => (this.containerElement = element)}
        className='monaco-editor-container'
      />
    )
  }
}
