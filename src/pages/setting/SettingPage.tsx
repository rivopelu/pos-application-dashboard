import { IconButton, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import { t } from 'i18next';
import { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { MainCard } from '../../components/MainCard';
import { PageContainer } from '../../components/PageContainer';
import { useDataConstants } from '../../constants/useDataConstants';
import { settingMenuType } from '../../models/feature-type-interface';
import { BusinessSetting } from './BusinessSetting';
import { ProfileSetting } from './ProfileSetting';
import { useNavigate } from 'react-router-dom';

export function SettingPage() {
  const [activeTab, setActiveTab] = useState<settingMenuType>('BUSINESS');
  const navigate = useNavigate();

  function checkType() {
    if (activeTab === 'ACCOUNT') {
      return <ProfileSetting />;
    } else if (activeTab === 'BUSINESS') {
      return <BusinessSetting />;
    } else {
      return <></>;
    }
  }

  return (
    <PageContainer className="mt-8" size="xs">
      <div className="h-full">
        <MainCard className="h-full">
          <div className="border-b p-3">
            <div className="flex items-center gap-2">
              <IconButton onClick={() => navigate(-1)}>
                <MdArrowBack />
              </IconButton>
              <div className="text-2xl capitalize font-semibold text-slate-600 italic">{t('setting')}</div>
            </div>
          </div>
          <div className="flex min-h-[70%]">
            <div className="w-72 border-r">
              <div>
                <MenuList>
                  {useDataConstants().settingMenuList.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <MenuItem key={i} onClick={() => setActiveTab(item.type as settingMenuType)}>
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
            <div className="w-full">{checkType()}</div>
          </div>
        </MainCard>
      </div>
    </PageContainer>
  );
}
