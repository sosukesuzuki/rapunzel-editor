import React from 'react'
import { Provider, observer } from 'mobx-react'
import styled from 'styled-components'
import Header from './organisms/Header'
import SideNav from './organisms/SideNav'
import Detail from './organisms/Detail'
import { DirectoriesStore } from '../../lib/stores/DirectoriesStore'
import { CurrentFileStore } from '../../lib/stores/CurrentFileStore'

interface AppProps {
  directoriesStore: DirectoriesStore
  currentFileStore: CurrentFileStore
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
      directoriesStore,
      currentFileStore
    } = this.props

    return (
      <Provider
        directoriesStore={directoriesStore}
        currentFileStore={currentFileStore}>
        <Container>
          <Header />
          <SideNav />
          <Detail />
        </Container>
      </Provider>
    )
  }
}
