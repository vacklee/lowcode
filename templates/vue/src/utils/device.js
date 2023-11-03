function autoCheck() {
  const { innerWidth } = window
  const isMobile = innerWidth <= 750
  const remFontSize = 10 * (innerWidth / 750)

  if (isMobile) {
    document.documentElement.classList.remove('is-pc')
    document.documentElement.classList.add('is-mobile')
  } else {
    document.documentElement.classList.remove('is-mobile')
    document.documentElement.classList.add('is-pc')
  }

  document.documentElement.style.fontSize = `${remFontSize}px`
}

window.addEventListener('load', autoCheck)
window.addEventListener('resize', autoCheck)
window.addEventListener('orientationchange', autoCheck)
