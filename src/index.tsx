import * as ReactDOM from 'react-dom'
import * as React from 'react'
import 'normalize.css'
import App from './ui/components/App'
import fs from 'fs'

const g: any = global
g.fs = fs

ReactDOM.render(<App />, document.querySelector('.root'))
