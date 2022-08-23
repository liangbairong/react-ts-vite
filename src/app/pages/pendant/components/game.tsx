import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import Img from 'elelive-ui/es/Components/Img';
import 'elelive-ui/es/Components/Img/index.css';
import { formatNum } from '@Utils/index';
import { ISigUp, IRankOther } from '../type';
import '../index.scss';

const RankOther: FC<IRankOther> = ({ rank = 0, gapNum = 0, type = 0}: IRankOther): JSX.Element => {
    if (type === 1 && rank === 1) {
        return <p>-</p>;
    }
    if (gapNum > 0 || gapNum === 0) {
        return <p>{formatNum(gapNum)}</p>;
    }
    return <p>-</p>;
};

// 比赛阶段
const Game: FC<ISigUp> = ({ info }: ISigUp): JSX.Element => {
    if (info?.state === 1) {
        // 分组后阶段排名在30名以外不需要展示上下名次
        return (
            <>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <div className="livePendant-box-li">
                            <Img
                                src={new URL('@Assets/images/pendant/room/top-btn.png',import.meta.url).href}
                                className="livePendant-box-li-img"
                            />
                            {/* 2、甜蜜日榜排名从No.2变为No.1，甜蜜值1600，距上一名显示“-”，距下一名100 */}
                            <RankOther
                                type={1}
                                rank={info?.rankDTO?.rank}
                                gapNum={info?.rankDTO?.prevValue}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="livePendant-box-li livePendant-box-li-solid">
                            <Img
                                src={new URL('@Assets/images/pendant/room/bottom-btn.png',import.meta.url).href}
                                className="livePendant-box-li-img"
                            />
                            <RankOther
                                type={2}
                                rank={info?.rankDTO?.rank}
                                gapNum={info?.rankDTO?.nextValue}
                            />
                        </div>
                    </Grid>
                </Grid>
            </>
        );
    }
    return <></>;
};

export default Game;
