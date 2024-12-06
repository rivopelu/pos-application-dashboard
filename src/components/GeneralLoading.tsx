import { CircularProgress, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import {useAppSelector} from "../redux/store.ts";
import {IAccountSlice} from "../redux/reducers/account.slice.ts";

export function GeneralLoading() {
  const [open, setOpen] = useState<boolean>(false)
  const account: IAccountSlice = useAppSelector((state) => state.Account)

  useEffect(() => {
    setOpen(account?.getMe?.loading || false)
  }, [account?.getMe])
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ zIndex: 9999 }}
    >
      <div
        className="h-screen w-screen bg-white  flex-col gap-4 flex items-center justify-center"
        style={{ zIndex: 99999 }}
      >
        <CircularProgress size={80} />
        <h1 className="text-4xl text-primary-main">LOADING</h1>
      </div>
    </Modal>
  )
}
