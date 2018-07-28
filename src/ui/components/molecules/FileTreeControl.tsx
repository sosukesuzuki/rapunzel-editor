import React from 'react'
import styled from 'styled-components'
import AddFileButton from '../atoms/AddFileButton'
import { isMd } from '../../../lib/utils/isMd'

const Container = styled.div`
  .flexContainer {
    display: flex;
  }
  input {
    width: 100%;
  }
`

interface FileTreeControlState {
  isInputting: boolean
  inputContent: string
}

export default class FileTreeControl extends React.Component<{}, FileTreeControlState> {
  constructor (props) {
    super(props)
    this.state = {
      isInputting: false,
      inputContent: ''
    }
  }
  
  input: HTMLInputElement = null

  setIsInputting = (isInputting: boolean) => this.setState({ isInputting })

  setInputContent = (inputContent: string) => this.setState({ inputContent })

  handleKeydown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return
    this.submitInput()
  }

  submitInput = () => {
    if (isMd(this.state.inputContent)) {
      this.setInputContent('')
      this.setIsInputting(false)
      console.log('SubmitInput')
    } else {
      throw Error('The file extension must be ".md".')
    }
  }

  render () {
    const {
      isInputting,
      inputContent
    } = this.state
    return (
      <Container>
        <div className='flexContainer'>
          <h2>File Tree</h2>
          <div>
            <AddFileButton onClick={() => this.setIsInputting(true)} />
          </div>
        </div>
        { isInputting &&
          <input
            ref={input => {
              this.input = input
              if (input != null) this.input.focus()
            }}
            value={inputContent}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setInputContent(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent) => this.handleKeydown(e)}
            onBlur={() => this.setIsInputting(false)}
          />
        }
      </Container>
    )
  }
}
