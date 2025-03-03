import type { NextApiRequest, NextApiResponse } from 'next'
import { Innertube } from 'youtubei.js'

type ResponseData = {
  message: string
  data: string[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { videoId } = req.query
  if (typeof videoId !== 'string') {
    res
      .status(500)
      .json({ message: '비디오 아이디를 문자열로 보내주세요', data: [] })
    return
  }
  const youtube = await Innertube.create({
    lang: 'ko',
    location: 'Korea',
    retrieve_player: false,
  })

  try {
    const info = await youtube.getInfo(videoId)
    const title = info.primary_info?.title.text
    const transcriptData = await info.getTranscript()
    const transcript =
      transcriptData?.transcript?.content?.body?.initial_segments
        .map((segment) => segment.snippet.text)
        .filter((v): v is string => v != null) ?? []

    res.status(200).send({ message: '성공', data: transcript })
    return { title, transcript }
  } catch (error) {
    console.error('Error fetching transcript:', error)
    throw error
  }
  // await YoutubeTranscript.fetchTranscript(url, { lang: 'ko' }).then((data) =>
  //   res.status(200).send({ message: '성공', data }),
  // )
}
