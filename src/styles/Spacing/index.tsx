interface Props {
  size: number | string
}

export const Spacing = ({ size }: Props) => {
  return (
    <div
      style={{ height: size, width: 1, backgroundColor: 'transparent' }}
    ></div>
  )
}
