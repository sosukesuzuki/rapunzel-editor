import React from 'react'
import styled from 'styled-components'
import { grey } from '../../../lib/colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface DirectoryLineProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

const Container = styled.div`
  display: flex;
  &:hover {
    background-color: ${grey[2]}
  }
  .folderName {
    flex: 1;
  }
  .icons {
    svg {
      padding: 0 1p;
      &:hover {
        color: ${grey[5]}
      }
    }
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  }
`

export default class DirectoryLine extends React.Component<DirectoryLineProps> {
  handleClickNewFileButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  handleClickNewFolderButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  render () {
    const { onClick, children } = this.props
    return (
      <Container>
        <div className='folderName' onClick={onClick}>
          {children}
        </div>
        <div className='icons'>
          <button> 
            <FontAwesomeIcon icon='file' />
          </button>
          <button>
            <FontAwesomeIcon icon='folder' />
          </button>
        </div>
      </Container>
    )
  }
}
