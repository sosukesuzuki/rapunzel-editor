import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome';
import { grey } from '../../../lib/colors'

interface DetailHeaderProps {
  pathname: string
  handleClickEditorButton: () => void,
  type: 'editor' | 'preview'
}

const Container = styled.div`
  display: flex;
  background-color: white;
  border-bottom: 1px solid ${grey[3]};
  padding: 0 10px;
  span {
    flex: 1;
    line-height: 25px;
  }
  .icons {
    button {
      padding: 0;
      background-color: transparent;
      border: none;
      line-height: 25px;
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
    const { pathname, handleClickEditorButton, type } = this.props
    return (
      <Container>
        <span>{pathname}</span>
        <div className='icons'>
          <button onClick={handleClickEditorButton}>
            <FontAwesomeIcon icon={
              type === 'editor'
                ? 'eye'
                : 'edit'
            } />
          </button>
        </div>
      </Container>
    )
  }
}
