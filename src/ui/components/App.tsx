import React from 'react'
import { Provider, observer } from 'mobx-react'
import styled from 'styled-components'
import Header from './organisms/Header'
import FileTree from './organisms/FileTree'
import Detail from './organisms/Detail'
import { DirectoriesStore } from '../../lib/stores/DirectoriesStore'

interface AppProps {
  directoriesStore: DirectoriesStore
}

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 70px;
  grid-template-columns: 300px 1fr;
  grid-auto-flow: dense;
}
`

@observer
export default class App extends React.Component<AppProps> {
  render () {
    const {
      directoriesStore
    } = this.props

    return (
      <Provider directoriesStore={directoriesStore}>
        <Container>
          <Header />
          <FileTree />
          <Detail />
        </Container>
      </Provider>
    )
  }
}
