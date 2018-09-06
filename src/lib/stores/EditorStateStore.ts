import { observable, action } from 'mobx'
import { getSideNavWidth, getIsHiddenSideNav, setSideNavWidth, setIsHiddenSideNav } from '../localStorage'

export class EditorStateStore {
  @observable public sideNavWidth: number
  @observable public isHiddenSideNav: boolean

  constructor ({ sideNavWidth, isHiddenSideNav }) {
    this.sideNavWidth = sideNavWidth || 200
    this.isHiddenSideNav = isHiddenSideNav || false
  }

  @action getSideNavWidthFormStorage = async () => {
    this.sideNavWidth = await getSideNavWidth()
  }

  @action getIsHiddenSideNav = async () => {
    this.isHiddenSideNav = await getIsHiddenSideNav()
  }

  @action setSideNavWidth = async (sideNavWidth: number) => {
    this.sideNavWidth = sideNavWidth
    await setSideNavWidth(sideNavWidth)
  }

  @action setIsHiddenSideNav = async (isHiddenSideNav: boolean) => {
    this.isHiddenSideNav = isHiddenSideNav
    await setIsHiddenSideNav(isHiddenSideNav)
  }
}
