import * as ReactDOM from 'react-dom'
import * as React from 'react'
import 'normalize.css'
import App from './ui/components/App'
import fs from 'fs'
import { FileTreeStore } from './lib/stores/FileTreeStore'
import { CurrentFileStore } from './lib/stores/CurrentFileStore'
import { readFileNode } from './lib/utils/getFileTree'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCaretDown,
  faCaretRight
} from '@fortawesome/free-solid-svg-icons'
import { writeFile } from './lib/filesystem/commands/writeFile'
import { readFile } from './lib/filesystem/queries/readFile'
import { File } from './lib/types'
import { initializeIcons } from '@uifabric/icons'

const g: any = global
g.fs = fs

library.add(
  faCaretDown,
  faCaretRight
)

initializeIcons()

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

  ReactDOM.render(<App fileTreeStore={fileTreeStore} currentFileStore={currentFileStore} />, document.querySelector('.root'))
})().catch(err => console.error(err))
