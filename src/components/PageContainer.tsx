import { ReactNode } from 'react'

export function PageContainer(props: IProps) {
  if (props.size === 'xs') {
    return (
      <div className={`max-w-3xl w-full mx-auto ${props.className || ''}`}>{props.children}</div>
    )
  } else {
    return <div className={`px-10 ${props.className || ''}`}>{props.children}</div>
  }
}

interface IProps {
  children: ReactNode
  className?: string
  size?: 'xs'
}
