import { Button, TextField, Typography } from '@mui/material'
import { Spacing } from '@/styles/Spacing'
import { useCallback, useState } from 'react'
import { Flex } from '@/styles/Flex'
import { YOUTUBE_LINK_REGEX } from '@/constants'
import { TranscriptResponse } from 'youtube-transcript'
import { GeminiClient } from '@/libraries/Gemini'
import Markdown from 'react-markdown'
import { useMutation } from '@tanstack/react-query'

const TUNING_TEXT = '\n\n위 글을 요약해줘.'
export default function Page() {
  const [value, setValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [summary, setSummary] = useState('')

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

    return data.map((v) => v.text).join(' ')
  }

  const getSummary = async (value: string) => {
    try {
      const model = await GeminiClient.getGenerativeModel({
        model: 'gemini-2.0-flash',
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
          responseMimeType: 'text/plain',
        },
      })
      const { response } = await model.generateContent(`${value}${TUNING_TEXT}`)
      return response.text()
    } catch (error) {
      alert(`에러가 발생했습니다.\n${JSON.stringify(error)}`)
    }
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const subscription = await getTranscript()
      const summary = await getSummary(subscription)
      setSummary(summary ?? '')
    },
  })

  return (
    <>
      <Flex flexDirection="column" width="100%">
        <Typography variant="h5" fontWeight="bold">
          YOUTUBE SUMMARY
        </Typography>
        <Spacing size={12} />
        <Flex flexDirection="row">
          <TextField
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
            onClick={() => mutate()}
            disabled={errorMessage.length > 0 || value.length === 0}
            loading={isPending}
          >
            요악하기
          </Button>
        </Flex>
      </Flex>
      <Markdown>{summary}</Markdown>
    </>
  )
}
