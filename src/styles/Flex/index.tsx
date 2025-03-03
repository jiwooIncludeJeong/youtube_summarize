import { CSSProperties, PropsWithChildren } from 'react'

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
