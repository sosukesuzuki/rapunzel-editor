import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { Directories } from '../../../lib/types'
import { grape } from '../../../lib/colors'

interface FileTreeProps {
  directories: Directories
}

const Container = styled.div`
  background-color: ${grape[2]};
`

@observer
export default class FileTree extends React.Component<FileTreeProps> {
  render () {
    const { directories } = this.props
    return (
      <Container>
        {directories.map((directory, i) => {
          return (
            <p key={`${directory.name}${i}`}>{directory.name}</p>
          )
        })}
      </Container>
    )
  }
}
