import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome';
import { grey } from '../../../lib/colors'

interface DetailHeaderProps {
  pathname: string
}

const Container = styled.div`
  display: flex;
  background-color: ${grey[1]};
  span {
    flex: 1;
  }
  .icons {
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      &:hover {
        color: ${grey[5]};
      }
    }
  }
`

@observer
export default class DetailHeader extends React.Component<DetailHeaderProps> {
  render () {
    const { pathname } = this.props
    return (
      <Container>
        <span>{pathname}</span>
        <div className='icons'>
          <button>
            <FontAwesomeIcon icon='edit' />
          </button>
        </div>
      </Container>
    )
  }
}
