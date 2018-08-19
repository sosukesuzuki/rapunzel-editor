import React from 'react'
import styled from 'styled-components'
import { ContextMenu as Original, Item } from 'react-contexify'
import { grey } from '../../../lib/colors'

interface FileTreeLineContextMenuProps {
  identifier: string
  onRenameClick: () => void
  onDeleteClick: () => void
}

const ContextMenu = styled(Original)`
  position: fixed;
  opacity: 0;
  user-select: none;
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.3) 0 10px 20px, #eeeeee 0 0 0 1px;
  padding: 5px 0;
  font-size: 14px;
  border-radius: 5px;
  .react-contexify__item {
    cursor: pointer;
    position: relative;
  }
  .react-contexify__item:not(.react-contexify__item--disabled):hover > .react-contexify__item__data {
    background-color: ${grey[1]};
  }
  .react-contexify__item__data {
    min-width: 140px;
    padding: 6px 12px;
    display: flex;
    text-align: left;
    white-space: nowrap;
    color: #333;
    position: relative;
  }
`

export default class FileTreeLineContextMenu extends React.Component<FileTreeLineContextMenuProps> {
  render () {
    const { identifier, onRenameClick, onDeleteClick } = this.props
    return (
      <ContextMenu id={identifier}>
        <Item onClick={onRenameClick}>
          Rename
        </Item>
        <Item onClick={onDeleteClick}>
          Delete
        </Item>
      </ContextMenu>
    )
  }
}
