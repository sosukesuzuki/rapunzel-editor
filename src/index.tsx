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

const g: any = global
g.fs = fs

initializeIcons('../assets/fonts/office-ui-fabric/')

;(async () => {
  const hasVisited = !!localStorage.getItem('hasVisited')
  localStorage.setItem('hasVisited', 'true')

  let currentFileStore: CurrentFileStore
  if (hasVisited) {
    currentFileStore = new CurrentFileStore(null)
  } else {
    const readmePath = 'README.md'
    await writeFile(readmePath, `
# Rapunzel

The fs based note-taking app focuses markdown.

## How to develop?

\`\`\`
$ yarn
$ yarn run dev
\`\`\`

## Author

- [sosukesuzuki](https://github.com/sosukesuzuki)

## Attention

You can use Rapunzel on the modern browser only.

## Licence

MIT
    `)
    const content = await readFile(readmePath)
    const readmeFile: File = {
      pathname: readmePath,
      content
    }
    currentFileStore = new CurrentFileStore(readmeFile)
  }

  const fileTreeStore = new FileTreeStore(await readFileNode('.'))
  const editorStateStore = new EditorStateStore({ sideNavWidth: 200, isHiddenSideNav: false })

  ReactDOM.render(
    <App
      fileTreeStore={fileTreeStore}
      currentFileStore={currentFileStore}
      editorStateStore={editorStateStore}
    />,
    document.querySelector('.root')
  )
})().catch(err => console.error(err))
