import React from 'react'
import styled from 'styled-components'
import { FileNode } from '../../../lib/types'
import { observer } from 'mobx-react';
import FileLine from './FileLine'
import { grey } from '../../../lib/colors'

interface DirectoryLineProps {
  directory: FileNode
}

interface DirectoryLineState {
  isOpen: boolean
}

const Container = styled.div`
  div {
    width: 100%;
    padding: 7px;
    background-color: transparent;
    cursor: pointer;
  }
  .dir {
    &:hover {
      background-color: ${grey[2]}
    }
  }
`

@observer
export default class DirectoryLine extends React.Component<DirectoryLineProps, DirectoryLineState> {
  constructor (props) {
    super(props)
    const { directory } = props
    this.state = {
      isOpen: directory.pathname === '.'
        ? true
        : false
    }
  }

  setIsOpen = (isOpen: boolean) => this.setState({isOpen})

  handleClick = (e: React.MouseEvent<HTMLDivElement>, isOpen: boolean) => {
    e.preventDefault()
    this.setIsOpen(isOpen)
  }

  render () {
    const { directory } = this.props
    const { isOpen } = this.state
    return (
      <Container>
        {directory.type === 'dir' &&
          <div className='dir' onClick={(e: React.MouseEvent<HTMLDivElement>) => this.handleClick(e, !isOpen)}>{directory.pathname}</div>
        }
        { isOpen && directory.type === 'dir' &&
          directory.children.map((fileNode: FileNode) => {
            if (fileNode.type === 'dir') {
              return (<DirectoryLine key={`${fileNode.pathname}`} directory={fileNode} />)
            } else if (fileNode.type === 'file') {
              return (<FileLine key={`${fileNode.pathname}`} file={fileNode} />)
            }
          })}
      </Container>
    )
  }
}

