import { CSSProperties, PropsWithChildren } from 'react'
import { Property } from 'csstype'

export const Flex = ({
  children,
  ...cssProps
}: PropsWithChildren<CSSProperties>) => {
  return (
    <div style={{ display: 'flex', width: '100%', ...cssProps }}>
      {children}
    </div>
  )
}
