import { CurrentFileStore } from './CurrentFileStore'
import { EditorStateStore } from './EditorStateStore'
import { FileTreeStore } from './FileTreeStore'

export * from './CurrentFileStore'
export * from './EditorStateStore'
export * from './FileTreeStore'

export default interface Stores {
  currentFileStore: CurrentFileStore
  editorStateStore: EditorStateStore
  fileTreeStore: FileTreeStore
}
