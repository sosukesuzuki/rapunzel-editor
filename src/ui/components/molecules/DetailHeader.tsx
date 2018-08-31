import React from 'react'
import styled from 'styled-components'
import path from 'path'
import { observer } from 'mobx-react'
import fileDownload from 'js-file-download'
import { grey } from '../../../lib/colors'
import { IconButton } from 'office-ui-fabric-react/lib/Button'
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip'

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
    line-height: 32px;
  }
  .icons {
    button {
      padding: 0;
      line-height: 32px;
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
    const downloadTooltipIdentifier = `${pathname}_download_tooltip`
    const toEditTooltipIdentifer = `${pathname}_to_edit_tooltip`
    const toPreviewTooltipIdentifer = `${pathname}_to_preview_tooltip`

    return (
      <Container>
        <span>{pathname}</span>
        <div className='icons'>
          <TooltipHost content='download' id={downloadTooltipIdentifier}>
            <IconButton
              iconProps={{ iconName: 'Download' }}
              ariaLabel='Download'
              title='Download'
              onClick={this.handleClickDownloadButton}
              aria-describedby={downloadTooltipIdentifier}
            />
          </TooltipHost>
          {type === 'preview'
            ? (
              <TooltipHost content='to edit' id={toEditTooltipIdentifer}>
                <IconButton
                  iconProps={{ iconName: 'EditNote' }}
                  ariaLabel='Edit'
                  title='Edit'
                  onClick={handleClickEditorButton}
                  aria-describedby={toEditTooltipIdentifer}
                />
              </TooltipHost>
            )
            : (
              <TooltipHost content='to preview' id={toPreviewTooltipIdentifer}>
                <IconButton
                  iconProps={{ iconName: 'RedEye' }}
                  ariaLabel='Eye'
                  title='Eye'
                  onClick={handleClickEditorButton}
                  aria-describedby={toPreviewTooltipIdentifer}
                />
              </TooltipHost>
            )
          }
        </div>
      </Container>
    )
  }
}
