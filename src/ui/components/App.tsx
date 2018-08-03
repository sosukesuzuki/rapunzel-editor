import React from 'react'
import { Provider, observer } from 'mobx-react'
import styled from 'styled-components'
import Header from './organisms/Header'
import SideNav from './organisms/SideNav'
import Detail from './organisms/Detail'
import { FileTreeStore } from '../../lib/stores/FileTreeStore'
import { CurrentFileStore } from '../../lib/stores/CurrentFileStore'

interface AppProps {
  fileTreeStore: FileTreeStore 
  currentFileStore: CurrentFileStore
}

interface AppState {
  isSliderFocused: boolean,
  sideNavWidth: number
}

interface ContainerStyleProps {
  sideNavWidth: number
}

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 40px;
  grid-template-columns: ${({ sideNavWidth }: ContainerStyleProps) => sideNavWidth}px 2px 1fr;
  grid-auto-flow: dense;
  .resize {
    cursor: col-resize;
  }
}
`

@observer
export default class App extends React.Component<AppProps, AppState> {
  constructor (props) {
    super(props)
    this.state = {
      isSliderFocused: false,
      sideNavWidth: 250
    }
  }

  setIsSliderFocused = (isSliderFocused: boolean) => this.setState({ isSliderFocused })

  setSideNavWidth = (sideNavWidth: number) => this.setState({ sideNavWidth })

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    this.setIsSliderFocused(true)
  }

  handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    this.setIsSliderFocused(false)
  }

  handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!this.state.isSliderFocused) return
    let newSideNavWidth = e.pageX
    if (newSideNavWidth < 201) {
      newSideNavWidth = 200
    } else if (newSideNavWidth > 500){
      newSideNavWidth = 500
    }
    this.setSideNavWidth(newSideNavWidth)
  }

  render () {
    const {
      fileTreeStore,
      currentFileStore
    } = this.props
    const { sideNavWidth } = this.state

    return (
      <Provider
        fileTreeStore={fileTreeStore}
        currentFileStore={currentFileStore}>
        <Container
          sideNavWidth={sideNavWidth}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}>
          <Header />
          <SideNav />
          <div className='resize' onMouseDown={this.handleMouseDown} />
          <Detail />
        </Container>
      </Provider>
    )
  }
}
