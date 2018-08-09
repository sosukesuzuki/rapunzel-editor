import React from 'react'
import { Provider, observer } from 'mobx-react'
import styled from 'styled-components'
import Header from './templates/Header'
import SideNav from './templates/SideNav'
import Detail from './templates/Detail'
import SearchModal from './templates/SearchModal'
import { FileTreeStore } from '../../lib/stores/FileTreeStore'
import { CurrentFileStore } from '../../lib/stores/CurrentFileStore'

interface AppProps {
  fileTreeStore: FileTreeStore
  currentFileStore: CurrentFileStore
}

interface AppState {
  isSliderFocused: boolean,
  sideNavWidth: number
  isSearchModalShow: boolean
}

interface ContainerStyleProps {
  sideNavWidth: number
}

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 40px;
  grid-template-columns: ${({ sideNavWidth }: ContainerStyleProps) => sideNavWidth}px 1px 1fr;
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
      sideNavWidth: 250,
      isSearchModalShow: false
    }
  }

  setIsSliderFocused = (isSliderFocused: boolean) => this.setState({ isSliderFocused })

  setSideNavWidth = (sideNavWidth: number) => this.setState({ sideNavWidth })

  setIsSearchModalShow = (isSearchModalShow: boolean) => this.setState({ isSearchModalShow })

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
    } else if (newSideNavWidth > 500) {
      newSideNavWidth = 500
    }
    this.setSideNavWidth(newSideNavWidth)
  }

  render () {
    const {
      fileTreeStore,
      currentFileStore
    } = this.props
    const { sideNavWidth, isSearchModalShow } = this.state

    return (
      <Provider
        fileTreeStore={fileTreeStore}
        currentFileStore={currentFileStore}>
        <>
          <Container
            sideNavWidth={sideNavWidth}
            onMouseUp={this.handleMouseUp}
            onMouseMove={this.handleMouseMove}>
            <Header showModal={() => this.setIsSearchModalShow(true)} />
            <SideNav />
            <div className='resize' onMouseDown={this.handleMouseDown} />
            <Detail />
          </Container>
          {isSearchModalShow &&
            <SearchModal closeModal={() => this.setIsSearchModalShow(false)}/>
          }
        </>
      </Provider>
    )
  }
}
