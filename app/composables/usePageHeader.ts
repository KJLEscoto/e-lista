export const usePageHeader = () => {
  const title = useState<string>('pageHeader.title', () => '')
  const description = useState<string>('pageHeader.description', () => '')

  const setHeader = (t: string, d?: string) => {
    title.value = t
    description.value = d ?? ''
  }

  return { title, description, setHeader }
}