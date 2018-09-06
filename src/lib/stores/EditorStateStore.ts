import { observable, action } from 'mobx'
import { getSideNavWidth, getIsHiddenSideNav, setSideNavWidth, setIsHiddenSideNav } from '../localStorage'

export class EditorStateStore {
  @observable public sideNavWidth: number
  @observable public isHiddenSideNav: boolean
  timer: NodeJS.Timer

  constructor ({ sideNavWidth, isHiddenSideNav }: { sideNavWidth: number
    isHiddenSideNav: boolean}) {
    this.sideNavWidth = sideNavWidth || 200
    this.isHiddenSideNav = isHiddenSideNav || false
  }

  @action getSideNavWidthFormStorage = async () => {
    this.sideNavWidth = await getSideNavWidth() || 200
  }

  @action getIsHiddenSideNav = async () => {
    this.isHiddenSideNav = await getIsHiddenSideNav() || false
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
