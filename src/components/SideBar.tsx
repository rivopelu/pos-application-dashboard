import { IconButton, Tooltip } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {useDataConstants} from "../constants/useDataConstants.ts";
import {STYLE_VARIABLE} from "../constants/style-variable.ts";

export function SideBar() {
  const data = useDataConstants()
  const location = useLocation()
  const [currentPathSplit, setCurrentPathSplit] = useState<string>('/')

  function checkActiveNav(item: string) {
    const data = item.split('/')[1]
    return data.split('?')[0] === currentPathSplit
  }

  useEffect(() => {
    const data = location.pathname.split('/')[1]
    const split = data.split('?')[0]
    setCurrentPathSplit(split)
  }, [location.pathname])
  return (
    <div style={{ width: STYLE_VARIABLE.SIZE.SIDEBAR_WIDTH + 2 }} className={'h-screen '}>
      <div
        className={'bg-white h-screen w-full border-r fixed left-0'}
        style={{ width: STYLE_VARIABLE.SIZE.SIDEBAR_WIDTH }}
      >
        <div style={{ height: STYLE_VARIABLE.SIZE.TOP_BAR_HEIGHT }}></div>
        <div className={'flex flex-col items-center mt-5 gap-4'}>
          {data.sidebarDataList.map((item, i) => {
            const Icon = item.icon
            return (
              <Link to={item.path} key={i}>
                <Tooltip placement={'left'} title={item.title}>
                  <IconButton color={checkActiveNav(item.path) ? 'primary' : undefined}>
                    <Icon />
                  </IconButton>
                </Tooltip>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
