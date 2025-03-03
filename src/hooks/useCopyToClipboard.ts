import { useState } from 'react'

export function useCopyToClipboard() {
  const [copySuccess, setCopySuccess] = useState(false)

  const handleCopyClick = async (str: string) => {
    try {
      await navigator.clipboard.writeText(str)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 1000)
    } catch (error) {
      console.error('Failed to copy URL:', error)
    }
  }

  return { copySuccess, handleCopyClick }
}
