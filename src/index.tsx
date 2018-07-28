import * as ReactDOM from 'react-dom'
import * as React from 'react'
import 'normalize.css'
import App from './ui/components/App'
import fs from 'fs'
import { readdir } from './lib/filesystem/queries/readdir'
import { Directories } from './lib/types';
import { DirectoriesStore } from './lib/stores/DirectoriesStore'

const g: any = global
g.fs = fs

;(async () => {
 const directories: Directories = (await readdir('.')).map(dir => ({
   name: dir
 }))

 const directoriesStore = new DirectoriesStore(directories)

  ReactDOM.render(<App directoriesStore={directoriesStore}/>, document.querySelector('.root'))
})()
