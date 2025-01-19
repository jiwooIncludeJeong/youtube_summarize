import type { NextApiRequest, NextApiResponse } from 'next'
import { TranscriptResponse, YoutubeTranscript } from 'youtube-transcript'

type ResponseData = {
  message: string
  data: TranscriptResponse[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { url } = req.query
  if (typeof url !== 'string') {
    res.status(500).json({ message: 'URL은 문자열로 보내주세요', data: [] })
    return
  }
  await YoutubeTranscript.fetchTranscript(url, { lang: 'ko' }).then((data) =>
    res.status(200).send({ message: '성공', data }),
  )
}
