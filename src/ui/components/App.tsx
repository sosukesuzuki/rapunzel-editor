import React from 'react'
import styled from 'styled-components'
import Header from './organisms/Header'
import FileTree from './organisms/FileTree'
import Detail from './organisms/Detail'

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 70px;
  grid-template-columns: 300px 1fr;
  grid-auto-flow: dense;
}
`

const App = () => (
  <Container>
    <Header />
    <FileTree />
    <Detail />
  </Container>
)

export default App
