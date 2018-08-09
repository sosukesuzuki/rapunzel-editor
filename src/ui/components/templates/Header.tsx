import React from 'react'
import styled from 'styled-components'
import Button from '../atoms/Button'
import { grey } from '../../../lib/colors'
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome'

interface HeaderProps {
  showModal: () => void
}

const Container = styled.div`
  background: white;
  grid-column: 1 / 4;
  color: black;
  border-bottom: 0.5px solid ${grey[3]};
  display: flex;
  h1 {
    margin: 0;
    line-height: 40px;
    font-size: 20px;
    padding-left: 30px;
    flex: 1;
  }
  .icons {
    line-height: 40px;
    padding-right: 30px;
  }
`

export default class Header extends React.Component<HeaderProps> {
  render () {
    const { showModal } = this.props
    return (
      <Container>
        <h1>Rapunzel</h1>
        <div className='icons'>
          <Button onClick={showModal}>
            <FontAwesomeIcon icon='search' />
          </Button>
        </div>
      </Container>
    )
  }
}
