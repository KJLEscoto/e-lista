export const useAuthLayout = () => {
  const showHeader = useState('authLayout.showHeader', () => true)
  const showNav = useState('authLayout.showNav', () => true)

  const setLayout = (header: boolean, nav: boolean) => {
    showHeader.value = header
    showNav.value = nav
  }

  return { showHeader, showNav, setLayout }
}