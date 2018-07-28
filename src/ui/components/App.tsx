import React from 'react'
import { Provider } from 'mobx-react'
import styled from 'styled-components'
import Header from './organisms/Header'
import FileTree from './organisms/FileTree'
import Detail from './organisms/Detail'
import { Directories } from '../../lib/types'

interface AppProps {
  directories: Directories
}

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 70px;
  grid-template-columns: 300px 1fr;
  grid-auto-flow: dense;
}
`

export default class App extends React.Component<AppProps> {
  render () {
    const {
      directories
    } = this.props

    return (
      <Provider directories={directories}>
        <Container>
          <Header />
          <FileTree />
          <Detail />
        </Container>
      </Provider>
    )
  }
}
