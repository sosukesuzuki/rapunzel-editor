import * as ReactDOM from 'react-dom'
import * as React from 'react'
import 'normalize.css'
import App from './ui/components/App'
import fs from 'fs'
import { readdir } from './lib/filesystem/queries/readdir'

const g: any = global
g.fs = fs

console.log(readdir('.').then(h => console.log(h)))

ReactDOM.render(<App directories={[]}/>, document.querySelector('.root'))
