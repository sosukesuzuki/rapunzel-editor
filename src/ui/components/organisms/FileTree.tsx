import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { CurrentFileStore } from '../../../lib/stores/CurrentFileStore'
import { FileNode } from '../../../lib/types'
import DirectoryLine from '../molecules/DirectoryLine'
import FileLine from '../molecules/FileLine'

interface FileTreeProps {
  currentFileStore?: CurrentFileStore
  directory: FileNode
}

interface FileTreeState {
  isOpen: boolean
}

const Container = styled.div`
`

@inject('currentFileStore')
@observer
export default class FileTree extends React.Component<FileTreeProps, FileTreeState> {
  constructor (props) {
    super(props)
    const { directory } = props
    this.state = {
      isOpen: directory.pathname === '.'
        ? true
        : false
    }
  }

  setIsOpen = (isOpen: boolean) => this.setState({ isOpen })

  handleClick = (e: React.MouseEvent<HTMLDivElement>, isOpen: boolean) => {
    e.preventDefault()
    this.setIsOpen(isOpen)
  }

  render () {
    const { directory } = this.props
    const { isOpen } = this.state

    return (
      <Container>
        { directory.type === 'dir' &&
          <DirectoryLine
            isOpen={isOpen}
            setIsOpen={this.setIsOpen}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => this.handleClick(e, !isOpen)}
            directory={directory} />
        }
        { isOpen && directory.type === 'dir' &&
          directory.children.map((fileNode: FileNode) => {
            if (fileNode.type === 'dir') {
              return (<FileTree key={`${fileNode.pathname}`} directory={fileNode} />)
            } else if (fileNode.type === 'file') {
              return (<FileLine key={`${fileNode.pathname}`} file={fileNode} />)
            }
          })}
      </Container>
    )
  }
}
