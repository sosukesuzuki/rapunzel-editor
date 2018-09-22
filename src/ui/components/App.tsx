import React from 'react'
import { Provider, observer } from 'mobx-react'
import styled from 'styled-components'
import Header from './templates/Header'
import SideNav from './templates/SideNav'
import Detail from './templates/Detail'
import SearchModal from './templates/SearchModal'
import { FileTreeStore, CurrentFileStore, EditorStateStore } from '../../lib/stores'
import key from 'keymaster'
import { Fabric } from 'office-ui-fabric-react/lib/Fabric'
import { grey } from '../../lib/colors'

interface AppProps {
  fileTreeStore: FileTreeStore
  currentFileStore: CurrentFileStore
  editorStateStore: EditorStateStore
}

interface AppState {
  isSliderFocused: boolean,
  isSearchModalShow: boolean
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
      isSearchModalShow: false
    }

    key('ctrl+p', this.handlePushCtrlP)
  }

  async componentDidMount () {
    await this.props.editorStateStore.getSideNavWidthFormStorage()
  }

  timer: NodeJS.Timer

  setIsSliderFocused = (isSliderFocused: boolean) => this.setState({ isSliderFocused })

  setIsSearchModalShow = (isSearchModalShow: boolean) => this.setState({ isSearchModalShow })

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
    const { editorStateStore } = this.props
    e.preventDefault()
    if (!this.state.isSliderFocused) return
    let newSideNavWidth = e.pageX
    if (newSideNavWidth < 201) {
      newSideNavWidth = 200
    } else if (newSideNavWidth > 500) {
      newSideNavWidth = 500
    }

    editorStateStore.setSideNavWidth(newSideNavWidth)
  }

  render () {
    const {
      fileTreeStore,
      currentFileStore,
      editorStateStore
    } = this.props
    const {
      isSearchModalShow,
      isSliderFocused
    } = this.state

    const { sideNavWidth, isHiddenSideNav } = editorStateStore

    return (
      <Fabric>
        <Provider
          fileTreeStore={fileTreeStore}
          currentFileStore={currentFileStore}
          editorStateStore={editorStateStore}>
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
              <Detail />
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
