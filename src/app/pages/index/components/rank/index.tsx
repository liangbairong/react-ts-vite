// 甜蜜日榜
import React, { useEffect, useState, memo } from 'react';
import intl from 'react-intl-universal';
import TabMenu from 'elelive-ui/es/Components/TabMenu';
import appStore from "@Stores/appStore";
import './index.scss';

import Anchor from './anchor';
import User from './user';

const SweetRank = () => {
    const [path, setPath] = useState('anchor');
    const [list, setList] = useState<any>([
        {
            label: intl.get('dailyRanking') || '爱意日榜',
            value: 'anchor',
            path: 'anchor',
        },
    ]);
    const { anchorId } = appStore.params;
    useEffect(() => {
        if (anchorId) {
            list.push({
                label: intl.get('guardRankingRoom') || '直播间守护榜',
                value: 'user',
                path: 'user',
            });
            setList(list);
        }
    }, []);

    return (
        <div className="sweet-rank-wrap">
            {anchorId ? (
                <TabMenu
                    className="list-tab rank-tab"
                    menuList={list}
                    path={path}
                    onMenuChange={(data) => setPath(data.path)}
                />
            ) : (
                <div style={{ height: '40px' }} />
            )}

            {path === 'anchor' && <Anchor />}
            {path === 'user' && <User />}
        </div>
    );
};

export default memo(SweetRank);
