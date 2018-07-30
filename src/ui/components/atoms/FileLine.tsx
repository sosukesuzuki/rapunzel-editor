import React from 'react'
import styled from 'styled-components'
import { FileNode } from '../../../lib/types'
import { observer } from 'mobx-react'

interface FileLineProps {
  file: FileNode
}

const Container = styled.div``

@observer
export default class FileLine extends React.Component<FileLineProps> {
  render () {
    const { file } = this.props
    return (
      <Container>
        <span>{file.pathname}</span>
      </Container>
    )
  }
}