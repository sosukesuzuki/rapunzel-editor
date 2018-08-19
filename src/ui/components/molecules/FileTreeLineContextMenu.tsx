import React from 'react'
import { ContextMenu, Item } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'

interface FileTreeLineContextMenuProps {
  identifier: string
  onRenameClick: () => void
  onDeleteClick: () => void
}

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
