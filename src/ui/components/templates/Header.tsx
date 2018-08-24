import React from 'react'
import styled from 'styled-components'
import { grey } from '../../../lib/colors'
import { IconButton } from 'office-ui-fabric-react/lib/Button'

interface HeaderProps {
  openSearchModal: () => void
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
    display: flex;
    line-height: 40px;
    padding-right: 30px;
    button {
      height: 40px;
    }
  }
`

export default class Header extends React.Component<HeaderProps> {
  render () {
    const { openSearchModal } = this.props
    return (
      <Container>
        <h1>Rapunzel</h1>
        <div className='icons'>
          <IconButton
            iconProps={{ iconName: 'Search' }}
            ariaLabel='Search'
            title='Search'
            onClick={openSearchModal}
          />
        </div>
      </Container>
    )
  }
}
