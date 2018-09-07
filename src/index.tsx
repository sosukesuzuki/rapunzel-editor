import * as ReactDOM from 'react-dom'
import * as React from 'react'
import 'normalize.css'
import App from './ui/components/App'
import fs from 'fs'
import { FileTreeStore } from './lib/stores/FileTreeStore'
import { CurrentFileStore } from './lib/stores/CurrentFileStore'
import { EditorStateStore } from './lib/stores/EditorStateStore'
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
  const hasVisited = await getHasVisited()
  await setHasVisited(true)

  let currentFileStore: CurrentFileStore
  if (hasVisited) {
    try {
      const pathname = await getCurrentFile()
      const content = await readFile(pathname)
      const file = { pathname, content }
      currentFileStore = new CurrentFileStore(file)
    } catch (error) {
      currentFileStore = new CurrentFileStore(null)
    }
  } else {
    let initialFilePath = 'README.md'
    await writeFile(initialFilePath, READMEString)
    const content = await readFile(initialFilePath)
    const readmeFile: File = {
      pathname: initialFilePath,
      content
    }
    currentFileStore = new CurrentFileStore(readmeFile)
  }

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
