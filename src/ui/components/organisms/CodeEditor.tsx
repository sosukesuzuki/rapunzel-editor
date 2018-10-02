import React from 'react'
import styled from 'styled-components'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/edit/continuelist'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/keymap/vim'

const options = {
  lineNumbers: true,
  mode: 'markdown',
  theme: 'github-light',
  lineWrapping: true,
  keyMap: 'vim',
  extraKeys: {
    'Enter': 'newlineAndIndentContinueMarkdownList'
  }
}

const Container = styled.div``

interface CodeEditorProps {
  value: string
  onChange: (e: { target: any }) => void
  onContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void
}

export default class CodeEditor extends React.Component<CodeEditorProps> {
  cm: CodeMirror.EditorFromTextArea = null
  textarea: HTMLTextAreaElement = null
  disableHandleChange: boolean = false

  get value () {
    return this.cm.getDoc().getValue()
  }

  componentDidMount () {
    this.cm = CodeMirror.fromTextArea(this.textarea, options)

    this.disableHandleChange = false
    this.cm.getDoc().setValue(this.props.value)
    this.cm.on('change', this.handleChange)
  }

  componentWillUnmount () {
    this.cm.off('change', this.handleChange)
    this.cm.toTextArea()
  }

  componentDidUpdate () {
    const doc = this.cm.getDoc()
    const currentValue = this.props.value
    const isValueChanged = currentValue !== doc.getValue()

    if (isValueChanged && !this.disableHandleChange) {
      doc.setValue(currentValue)
    }
  }

  handleChange = (cm: CodeMirror.Editor, changeObj: CodeMirror.EditorChangeLinkedList) => {
    const { onChange } = this.props
    this.disableHandleChange = true

    onChange({ target: this })

    this.disableHandleChange = false
  }

  render () {
    const { onContextMenu } = this.props

    return (
      <Container
        className='edit'
        onContextMenu={onContextMenu}
      >
        <textarea
          ref={textarea => (this.textarea = textarea)}
        />
      </Container>
    )
  }
}
