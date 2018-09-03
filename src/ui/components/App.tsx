import React from 'react'
import { Provider, observer } from 'mobx-react'
import styled from 'styled-components'
import Header from './templates/Header'
import SideNav from './templates/SideNav'
import Detail from './templates/Detail'
import SearchModal from './templates/SearchModal'
import { FileTreeStore } from '../../lib/stores/FileTreeStore'
import { CurrentFileStore } from '../../lib/stores/CurrentFileStore'
import key from 'keymaster'
import { getSideNavWidth } from '../../lib/localStorage'
import { Fabric } from 'office-ui-fabric-react/lib/Fabric'
import { grey } from '../../lib/colors'

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
  width: 100vw;
  grid-template-rows: 40px;
  grid-template-columns: ${({ sideNavWidth }: ContainerStyleProps) => sideNavWidth}px 1px 1fr;
  grid-auto-flow: dense;
  .resize {
    cursor: col-resize;
    transition: all 0.3s ease;
    &:hover {
      background-color: ${grey[3]}
    }
  }
}
`

@observer
export default class App extends React.Component<AppProps, AppState> {
  constructor (props) {
    super(props)
    const sideNavWidth = getSideNavWidth()
    this.state = {
      isSliderFocused: false,
      sideNavWidth: sideNavWidth || 250,
      isSearchModalShow: false
    }

    key('ctrl+p', this.handlePushCtrlP)
  }

  timer: NodeJS.Timer

  setIsSliderFocused = (isSliderFocused: boolean) => this.setState({ isSliderFocused })

  setSideNavWidth = (sideNavWidth: number) => this.setState({ sideNavWidth })

  setIsSearchModalShow = (isSearchModalShow: boolean) => this.setState({ isSearchModalShow })

  setSideNavWithToLocalstorage = (sideNavWidth: number) => localStorage.setItem('sideNavWidth', sideNavWidth.toString())

  handlePushCtrlP = () => {
    this.setIsSearchModalShow(true)
  }

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

    clearTimeout(this.timer)
    this.timer = setTimeout(() => this.setSideNavWithToLocalstorage(newSideNavWidth), 100)
  }

  render () {
    const {
      fileTreeStore,
      currentFileStore
    } = this.props
    const { sideNavWidth, isSearchModalShow } = this.state

    return (
      <Fabric>
        <Provider
          fileTreeStore={fileTreeStore}
          currentFileStore={currentFileStore}>
          <>
            <Container
              sideNavWidth={sideNavWidth}
              onMouseUp={this.handleMouseUp}
              onMouseMove={this.handleMouseMove}>
              <Header
                openSearchModal={() => this.setIsSearchModalShow(true)}
              />
              <SideNav />
              <div className='resize' onMouseDown={this.handleMouseDown} />
              <Detail sideNavWidth={sideNavWidth} />
            </Container>
            <SearchModal
              isOpen={isSearchModalShow}
              closeModal={() => this.setIsSearchModalShow(false)}
            />
          </>
        </Provider>
      </Fabric>
    )
  }
}
