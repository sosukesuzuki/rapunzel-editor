import React from 'react'
import styled from 'styled-components'
import path from 'path'
import { FileNode } from '../../../lib/types'
import { observer } from 'mobx-react'
import { grey } from '../../../lib/colors'

interface FileLineProps {
  file: FileNode
}

interface ContainerProps {
  paddingLeft: number
}

const Container = styled.div`
  padding-left: ${(props: ContainerProps) => props.paddingLeft}px;
  background-color: transparent;
  &:hover {
    background-color: ${grey[2]};
  }
`

@observer
export default class FileLine extends React.Component<FileLineProps> {
  render () {
    const { file } = this.props
    const paddingLeft = (file.pathname.split('/').length - 1) * 5
    return (
      <Container paddingLeft={paddingLeft}>
        {path.basename(file.pathname)}
      </Container>
    )
  }
}