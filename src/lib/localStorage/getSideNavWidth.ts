export function getSideNavWidth () {
  const sideNavWidth = parseInt(localStorage.getItem('sideNavWidth'), 10)
  return sideNavWidth
}
