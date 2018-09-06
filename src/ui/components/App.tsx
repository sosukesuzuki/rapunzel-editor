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
import { getSideNavWidth, setSideNavWidth } from '../../lib/localStorage'
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
  isHiddenSideNav: boolean
}

interface ContainerStyleProps {
  sideNavWidth: number
  isSliderFocused: boolean
  isHiddenSideNav: boolean
}

const Container = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-rows: 40px;
  grid-template-columns: ${({ sideNavWidth, isHiddenSideNav }: ContainerStyleProps) => {
    if (!isHiddenSideNav) {
      return `${sideNavWidth}px 1px 1fr`
    } else {
      return '1fr'
    }
  }};
  grid-auto-flow: dense;
  overflow-y: hidden;
  .resize {
    cursor: col-resize;
    transition: all 0.3s ease;
    &:hover {
      background-color: ${grey[3]}
    }
    background-color: ${({ isSliderFocused }: ContainerStyleProps) => isSliderFocused && grey[3]}
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
      isSearchModalShow: false,
      isHiddenSideNav: false
    }

    key('ctrl+p', this.handlePushCtrlP)
  }

  async componentDidMount () {
    const sideNavWidth = await getSideNavWidth()
    this.setSideNavWidth(sideNavWidth)
  }

  timer: NodeJS.Timer

  setIsSliderFocused = (isSliderFocused: boolean) => this.setState({ isSliderFocused })

  setSideNavWidth = (sideNavWidth: number) => this.setState({ sideNavWidth })

  setIsSearchModalShow = (isSearchModalShow: boolean) => this.setState({ isSearchModalShow })

  setIsHiddenSideNav = (isHiddenSideNav: boolean) => this.setState({ isHiddenSideNav })

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
    this.timer = setTimeout(async () => {
      await setSideNavWidth(newSideNavWidth)
    }, 100)
  }

  render () {
    const {
      fileTreeStore,
      currentFileStore
    } = this.props
    const {
      sideNavWidth,
      isSearchModalShow,
      isSliderFocused,
      isHiddenSideNav
    } = this.state

    return (
      <Fabric>
        <Provider
          fileTreeStore={fileTreeStore}
          currentFileStore={currentFileStore}>
          <>
            <Container
              sideNavWidth={sideNavWidth}
              isSliderFocused={isSliderFocused}
              isHiddenSideNav={isHiddenSideNav}
              onMouseUp={this.handleMouseUp}
              onMouseMove={this.handleMouseMove}>
              <Header
                openSearchModal={() => this.setIsSearchModalShow(true)}
              />
              {!isHiddenSideNav &&
                <>
                  <SideNav />
                  <div className='resize' onMouseDown={this.handleMouseDown} />
                </>
              }
              <Detail
                sideNavWidth={sideNavWidth}
                toggleIsHiddenSideNav={() => {
                  this.setIsHiddenSideNav(!this.state.isHiddenSideNav)
                }}/>
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
