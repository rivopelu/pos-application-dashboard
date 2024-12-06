import { Dialog, IconButton, LinearProgress } from '@mui/material'
import { ReactNode } from 'react'
import { MdClose } from 'react-icons/md'

export function PopupModal(props: IProps)
{
  return (
    <Dialog maxWidth={props.size || 'md'} open={props.open || false} onClose={props.onClose}>
      <div className={'w-full'}>
        {props.loading && (
          <div>
            <LinearProgress />
          </div>
        )}

        {props.title && (
          <div className={'flex w-full items-center justify-between p-4 border-b shadow-md'}>
            <h4 className='text-3xl font-semibold'>{props.title.toUpperCase()}</h4>
            <IconButton onClick={props.onClose}>
              <MdClose />
            </IconButton>
          </div>
        )}
        <div className={'p-6 w-full'}>{props.component}</div>
        {props.footerCard && <div className={'p-6 border-t'}>{props.footerCard}</div>}
      </div>
    </Dialog>
  )
}

interface IProps
{
  open?: boolean
  component?: ReactNode
  onClose?: () => void
  title?: string
  loading?: boolean
  size?: 'lg' | 'md'
  footerCard?: ReactNode
}
