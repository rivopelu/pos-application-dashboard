import { MenuItem, Pagination, Select } from '@mui/material'
import {NumberFormatterHelper} from "../helper/numberFormatHelper.ts";
import {defaultPaginationType} from "../helper/paginationHelper.ts";
import {IResPaginatedData} from "../models/response/ResponseModel.ts";

export default function MainPagination(props: IProps) {
  const numberFormatHelper = new NumberFormatterHelper()

  function onChangeSize(value: number) {
    const data = {
      page: 0,
      size: value
    }
    props.onChange(data)
  }

  function onChangePage(e: number) {
    const data = {
      page: e - 1,
      size: props.data.size
    }
    props.onChange(data)
  }

  return (
    <div className="flex items-center lg:justify-between justify-center lg:flex-row flex-col mt-4 bg-white p-5 border rounded-lg">
      {props.loading ? (
        <div className="flex justify-center  w-full">LOADING</div>
      ) : (
        <>
          <div className="lg:flex items-center gap-4 hidden">
            <Select
              sx={{ minWidth: 100 }}
              size="small"
              value={props.data.size ? props.data.size : 10}
              onChange={(e) => onChangeSize(e.target.value as number)}
              variant={'outlined'}
            >
              <MenuItem value={5}>5 Items</MenuItem>
              <MenuItem value={10}>10 Items</MenuItem>
              <MenuItem value={20}>20 Items</MenuItem>
              <MenuItem value={50}>50 Items</MenuItem>
              <MenuItem value={100}>100 Items</MenuItem>
              <MenuItem value={1000}>1000 Items</MenuItem>
            </Select>
            <div>Size</div>
          </div>
          <Pagination
            page={props.data.page + 1}
            onChange={(_, v) => onChangePage(v)}
            count={props.data.page_count}
            color="primary"
            variant="outlined"
          />
          <div className="text-slate-600 italic mt-4 lg:mt-0">
            Total {numberFormatHelper.thousandSeparator(props.data.total_data)} Items
          </div>
        </>
      )}
    </div>
  )
}

interface IProps {
  loading?: boolean
  onChange: (e: defaultPaginationType) => void
  data: IResPaginatedData
}
