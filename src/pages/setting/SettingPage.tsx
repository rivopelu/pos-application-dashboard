import { ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import { MainCard } from '../../components/MainCard';
import { PageContainer } from '../../components/PageContainer';
import { useDataConstants } from '../../constants/useDataConstants';
import { useState } from 'react';

export function SettingPage() {
  const [data, setData] = useState<string>('A');

  return (
    <PageContainer className="mt-8" size="xs">
      <div className="h-full">
        <MainCard className="h-full">
          <div className="flex min-h-[70%]">
            <div className="w-72 border-r">
              <div>
                <MenuList>
                  {useDataConstants().settingMenuList.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <MenuItem key={i} onClick={() => setData('B')}>
                        <ListItemIcon>
                          <Icon className="text-2xl" />
                        </ListItemIcon>
                        <ListItemText className="capitalize">{item.label}</ListItemText>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </div>
            </div>
            <h1>{data}</h1>
          </div>
        </MainCard>
      </div>
    </PageContainer>
  );
}
