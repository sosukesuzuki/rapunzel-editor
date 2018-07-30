import React from 'react'
import styled from 'styled-components'
import path from 'path'
import { FileNode } from '../../../lib/types'
import { observer } from 'mobx-react'
import { grey } from '../../../lib/colors'

interface FileLineProps {
  file: FileNode
}

const Container = styled.div`
  background-color: transparent;
  margin-left: 5px;
  &:hover {
    background-color: ${grey[2]};
  }
`

@observer
export default class FileLine extends React.Component<FileLineProps> {
  render () {
    const { file } = this.props
    return (
      <Container>
        {path.basename(file.pathname)}
      </Container>
    )
  }
}