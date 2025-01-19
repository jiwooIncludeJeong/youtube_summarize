import { Button, TextField, Typography } from '@mui/material'
import { Title } from '@mui/icons-material'
import { Spacing } from '@/styles/Spacing'
import { useCallback, useRef, useState } from 'react'
import { Flex } from '@/styles/Flex'
import { YOUTUBE_LINK_REGEX } from '@/constants'
import { TranscriptResponse, YoutubeTranscript } from 'youtube-transcript'

export default function Page() {
  const textFieldRef = useRef<HTMLDivElement | null>(null)
  const [value, setValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const validate = useCallback((value: string) => {
    if (value.length === 0) {
      setErrorMessage('링크를 입력해주세요.')
    } else if (!YOUTUBE_LINK_REGEX.test(value)) {
      setErrorMessage('유튜브 링크가 아닙니다.')
    } else {
      setErrorMessage('')
    }
    setValue(value)
  }, [])

  const getTranscript = async () => {
    const { data }: { data: TranscriptResponse[] } = await (
      await fetch(`/api/transcript?url=${value}`)
    ).json()

    const 자막 = data.map((v) => v.text).join(' ')
  }

  return (
    <>
      <Typography variant="h5">YOUTUBE SUMMARY</Typography>
      <Spacing size={8} />
      <Flex flexDirection="row">
        <TextField
          ref={textFieldRef}
          value={value}
          label="유튜브 링크를 입력해주세요"
          autoFocus
          placeholder="유튜브 링크를 입력해주세요"
          fullWidth
          error={errorMessage.length > 0}
          helperText={errorMessage.length > 0 ? errorMessage : undefined}
          onChange={(event) => {
            validate(event.target.value)
          }}
        />
        <Button
          variant="contained"
          style={{ width: 100, height: 58 }}
          onClick={() => getTranscript()}
          disabled={errorMessage.length > 0 || value.length === 0}
        >
          요악하기
        </Button>
      </Flex>
    </>
  )
}
