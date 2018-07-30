import React from 'react'
import styled from 'styled-components'
import { grey } from '../../../lib/colors'

interface DirectoryLineProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

const Container = styled.div`
  &:hover {
    background-color: ${grey[2]}
  }
`

export default class DirectoryLine extends React.Component<DirectoryLineProps> {
  render () {
    const { onClick, children } = this.props
    return (
      <Container onClick={onClick}>
        {children}
      </Container>
    )
  }
}
