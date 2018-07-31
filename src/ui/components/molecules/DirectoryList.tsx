import React from 'react'
import styled from 'styled-components'
import { FileNode } from '../../../lib/types'
import { observer } from 'mobx-react';
import FileLine from '../atoms/FileLine'
import DirectoryLine  from '../atoms/DirectoryLine'

interface DirectoryListProps {
  directory: FileNode
}

interface DirectoryListState {
  isOpen: boolean
}

const Container = styled.div`
  div {
    background-color: transparent;
    cursor: pointer;
  }
`

@observer
export default class DirectoryList extends React.Component<DirectoryListProps, DirectoryListState> {
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
          <DirectoryLine
            isOpen={isOpen}
            setIsOpen={this.setIsOpen}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => this.handleClick(e, !isOpen)}
            directory={directory} />
        }
        { isOpen && directory.type === 'dir' &&
          directory.children.map((fileNode: FileNode) => {
            if (fileNode.type === 'dir') {
              return (<DirectoryList key={`${fileNode.pathname}`} directory={fileNode} />)
            } else if (fileNode.type === 'file') {
              return (<FileLine key={`${fileNode.pathname}`} file={fileNode} />)
            }
          })}
      </Container>
    )
  }
}

