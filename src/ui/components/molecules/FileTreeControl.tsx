import React from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import { FileTreeStore } from '../../../lib/stores/FileTreeStore'
import { CurrentFileStore } from '../../../lib/stores/CurrentFileStore';

const Container = styled.div`
  .flexContainer {
    height: 30px;
    display: flex;
    span {
      padding: 0 7px;
      line-height: 30px;
      flex: 1;
      font-weight: bold;
    }
  }
  input {
    width: 100%;
  }
`

interface FileTreeControlProps {
  fileTreeStore?: FileTreeStore 
  currentFileStore?: CurrentFileStore
}

@inject('fileTreeStore')
@inject('currentFileStore')
@observer
export default class FileTreeControl extends React.Component<FileTreeControlProps> {
  render () {
    return (
      <Container>
      </Container>
    )
  }
}
