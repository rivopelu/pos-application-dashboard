import { ReactNode } from 'react'

export function MainCard(props: IProps) {
  return (
    <div className={`bg-white border  rounded-md ${props.className || ' '}`}>{props.children}</div>
  )
}

export function CardBody(props: IProps): ReactNode {
  return <div className={`p-6  ${props.className || ' '}`}>{props.children}</div>
}

interface IProps {
  children?: ReactNode
  className?: string
}
