import React from 'react'
import styled from 'styled-components'
import path from 'path'
import { observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fileDownload from 'js-file-download'
import { grey } from '../../../lib/colors'
import Button from '../atoms/Button'

interface DetailHeaderProps {
  pathname: string
  handleClickEditorButton: () => void,
  type: 'editor' | 'preview'
  fileContent: string
}

const Container = styled.div`
  display: flex;
  background-color: white;
  border-bottom: 1px solid ${grey[3]};
  padding: 0 10px;
  font-size: 14px;
  span {
    flex: 1;
    line-height: 25px;
  }
  .icons {
    button {
      padding: 0;
      margin: 0 5px;
      /* background-color: transparent;
      border: none; */
      line-height: 25px;
      /* cursor: pointer; */
      /* &:hover {
        color: ${grey[5]};
      } */
    }
  }
`

@observer
export default class DetailHeader extends React.Component<DetailHeaderProps> {
  handleClickDownloadButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { pathname, fileContent } = this.props
    fileDownload(fileContent, path.basename(pathname))
  }

  render () {
    const { pathname, handleClickEditorButton, type } = this.props
    return (
      <Container>
        <span>{pathname}</span>
        <div className='icons'>
          <Button onClick={this.handleClickDownloadButton}>
            <FontAwesomeIcon icon='download' />
          </Button>
          <Button onClick={handleClickEditorButton}>
            <FontAwesomeIcon icon={
              type === 'editor'
                ? 'eye'
                : 'edit'
            } />
          </Button>
        </div>
      </Container>
    )
  }
}
