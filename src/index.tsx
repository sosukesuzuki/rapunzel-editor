import * as ReactDOM from 'react-dom'
import * as React from 'react'
import 'normalize.css'
import App from './ui/components/App'
import fs from 'fs'
import { FileTreeStore } from './lib/stores/FileTreeStore'
import { CurrentFileStore } from './lib/stores/CurrentFileStore'
import { readFileNode } from './lib/utils/getFileTree'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const g: any = global
g.fs = fs

library.add(faFile, faFolder, faFolderOpen, faTrash, faEdit)

;(async () => {
 const fileTreeStore = new FileTreeStore(await readFileNode('.'))
 const currentFileStore = new CurrentFileStore(null)

  ReactDOM.render(<App fileTreeStore={fileTreeStore} currentFileStore={currentFileStore} />, document.querySelector('.root'))
})()
