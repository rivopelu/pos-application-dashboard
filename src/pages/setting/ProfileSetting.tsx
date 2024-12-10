import { Avatar } from '@mui/material';
import { useAppSelector } from '../../redux/store';
import { IAccountSlice } from '../../redux/reducers/account.slice';

export function ProfileSetting() {
  const accont: IAccountSlice = useAppSelector((state) => state.Account);
  const data = accont?.getMe?.data;
  return (
    <div className="flex   w-full my-10 flex-col items-center gap-4">
      <div>
        <Avatar src={data?.avatar} sx={{ height: 100, width: 100 }} />
      </div>
      <div className="text-center">
        <h1 className="font-semibold text-2xl uppercase">{data?.name}</h1>
        <div>
          <p>{data?.username}</p>
        </div>
      </div>
    </div>
  );
}
