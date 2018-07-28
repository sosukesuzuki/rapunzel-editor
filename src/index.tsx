import * as ReactDOM from 'react-dom'
import * as React from 'react'
import 'normalize.css'
import App from './ui/components/App'
import fs from 'fs'
import { readDirectories } from './lib/utils/readDirectories'
import { Directories } from './lib/types';
import { DirectoriesStore } from './lib/stores/DirectoriesStore'

const g: any = global
g.fs = fs

;(async () => {
 const directories: Directories = await readDirectories('.')
 const directoriesStore = new DirectoriesStore(directories)

  ReactDOM.render(<App directoriesStore={directoriesStore}/>, document.querySelector('.root'))
})()
