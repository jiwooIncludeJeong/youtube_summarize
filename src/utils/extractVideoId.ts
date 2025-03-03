import { isValidYoutubeURL } from '@/utils/isValidYoutubeURL'

export const extractVideoId = (url: string) => {
  const validURL = isValidYoutubeURL(url)
  if (!validURL) {
    throw new Error('비디오 정보를 찾을 수 없어요')
  }
  const { hostname, pathname, searchParams } = new URL(url)
  const isYouTubeDomain =
    hostname === 'www.youtube.com' || hostname === 'youtube.com'
  const isYouTubeBeDomain = hostname === 'youtu.be'
  if (isYouTubeDomain) {
    return searchParams.get('v')
  }
  if (isYouTubeBeDomain) {
    return pathname.split('/').at(-1)
  }
  throw new Error('비디오 정보를 찾을 수 없어요')
}
