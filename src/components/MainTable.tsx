import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { Fragment, ReactNode } from 'react'
import { EmptyState } from './EmptyState'
import {STYLE_VARIABLE} from "../constants/style-variable.ts";
import {AlignType} from "../models/feature-type-interface.ts";

export function MainTable(props: IProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: 'none', borderRadius: 2 }}
      className={'border'}
    >
      {!props.loading && props.data.length === 0 && <EmptyState />}
      <div className={`${!props.loading && props.data.length === 0 ? 'hidden' : ''}`}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead className={'table_head '}>
            <TableRow>
              {props.columns.map((item, i) => (
                <TableCell
                  key={i}
                  align={item.align || 'left'}
                  className={item.headerClassName || ''}
                >
                  {item.headerTitle && item.headerTitle.toUpperCase()}
                  {item.headerComponent && item.headerComponent}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {props.loading ? (
            <TableBody>
              {Array.from({ length: 20 }).map((_, i) => (
                <TableRow key={i}>
                  {props.columns.map((_, i) => (
                    <TableCell key={i} component="th" scope="row">
                      <Skeleton height={30} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {props.data &&
                props.data.map((item, i) => (
                  <TableRow
                    key={i}
                    sx={{
                      background:
                        i % 2 === 0 && !props.disableMultiColor
                          ? STYLE_VARIABLE.COLORS.PRIMARY['5']
                          : 'white'
                    }}
                  >
                    {props.columns.map((c, id) => (
                      <TableCell key={id} component="th" scope="row" align={c.align}>
                        {props.columns.map((e, index) => {
                          if (e.key === c.key) {
                            return (
                              <Fragment key={index}>
                                {!e.layouts && item[e.value || '-']}
                                {e.layouts && e.layouts(item, i)}
                              </Fragment>
                            )
                          }
                        })}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          )}
        </Table>
      </div>
    </TableContainer>
  )
}

interface IProps {
  data: any[]
  columns: ITableColumnData[]
  loading?: boolean
  disableMultiColor?: boolean
  onCLickRow?: (e: any) => void
}

export interface ITableColumnData {
  sort?: boolean
  headerTitle?: string
  headerComponent?: ReactNode
  headerClassName?: string
  value?: string
  key: string
  className?: string
  layouts?: (data?: any, index?: number) => any
  loadingComponents?: any
  paddingNone?: boolean
  onSort?: (e: any) => void
  align?: AlignType
}
