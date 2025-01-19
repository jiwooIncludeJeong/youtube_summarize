import { PropsWithChildren } from 'react'
import { css } from '@emotion/react'
import { bgcolor } from '@mui/system'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        display: 'flex',
        maxWidth: '100vw',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightGrey',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '430px',
          width: '430px',
          overflowX: 'hidden',
          minHeight: '100vh',
          padding: '12px 24px',
        }}
      >
        {children}
      </div>
    </div>
  )
}
