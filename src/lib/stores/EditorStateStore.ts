import { observable, action } from 'mobx'
import { getSideNavWidth, getIsHiddenSideNav, setSideNavWidth, setIsHiddenSideNav } from '../localStorage'

export class EditorStateStore {
  @observable public sideNavWidth: number
  @observable public isHiddenSideNav: boolean
  timer: NodeJS.Timer

  constructor () {
    this.sideNavWidth = 250
    this.isHiddenSideNav = false
  }

  @action getSideNavWidthFormStorage = async () => {
    try {
      this.sideNavWidth = await getSideNavWidth()
    } catch (error) {
      this.sideNavWidth = 250
      await setSideNavWidth(250)
    }
  }

  @action getIsHiddenSideNav = async () => {
    try {
      this.isHiddenSideNav = await getIsHiddenSideNav()
    } catch (error) {
      this.isHiddenSideNav = false
      await setIsHiddenSideNav(false)
    }
  }

  @action setSideNavWidth = async (sideNavWidth: number) => {
    this.sideNavWidth = sideNavWidth

    clearTimeout(this.timer)
    this.timer = setTimeout(async () => {
      await setSideNavWidth(sideNavWidth)
    }, 100)
  }

  @action setIsHiddenSideNav = async (isHiddenSideNav: boolean) => {
    this.isHiddenSideNav = isHiddenSideNav
    await setIsHiddenSideNav(isHiddenSideNav)
  }
}
