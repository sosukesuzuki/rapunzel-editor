import * as ReactDOM from 'react-dom'
import * as React from 'react'
import 'normalize.css'
import App from './ui/components/App'
import fs from 'fs'
import { FileTreeStore, CurrentFileStore, EditorStateStore } from './lib/stores'
import { readFileNode } from './lib/filesystem/utils'
import { writeFile } from './lib/filesystem/commands'
import { readFile } from './lib/filesystem/queries'
import { File } from './lib/types'
import { initializeIcons } from '@uifabric/icons'
import { getHasVisited, setHasVisited, getCurrentFile } from './lib/localStorage'
import READMEString from './lib/READMEString'

const g: any = global
g.fs = fs

initializeIcons('../assets/fonts/office-ui-fabric/')

;(async () => {
  let currentFileStore: CurrentFileStore

  try {
    await getHasVisited()
    try {
      const pathname = await getCurrentFile()
      const content = await readFile(pathname)
      const file = { pathname, content }
      currentFileStore = new CurrentFileStore(file)
    } catch (error) {
      if (error.message !== 'Key of currentFile does not exists in localStorage') throw error
      currentFileStore = new CurrentFileStore(null)
    }
  } catch (error) {
    if (error.message !== 'Key of hasVisited does not exists in localStorage') throw error
    const initialFilePath = 'README.md'
    await writeFile(initialFilePath, READMEString)
    const content = await readFile(initialFilePath)
    const readmeFile: File = {
      pathname: initialFilePath,
      content
    }
    currentFileStore = new CurrentFileStore(readmeFile)
  }

  await setHasVisited(true)

  const fileTreeStore = new FileTreeStore(await readFileNode('.'))
  const editorStateStore = new EditorStateStore()
  await editorStateStore.getIsHiddenSideNav()
  await editorStateStore.getSideNavWidthFormStorage()

  ReactDOM.render(
    <App
      fileTreeStore={fileTreeStore}
      currentFileStore={currentFileStore}
      editorStateStore={editorStateStore}
    />,
    document.querySelector('.root')
  )
})().catch(err => console.error(err))
