import React from 'react'
import styled from 'styled-components'
import { FileNode } from '../../../lib/types'
import { observer } from 'mobx-react'
import { grey } from '../../../lib/colors'

interface FileLineProps {
  file: FileNode
}

const Container = styled.div`
  background-color: transparent;
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
        {file.pathname}
      </Container>
    )
  }
}