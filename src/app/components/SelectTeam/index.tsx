import React, { useState, useRef, useEffect, memo } from 'react';
import api from '@Lib/api';
import classNames from 'classnames';
import Img from 'elelive-ui/es/Components/Img';
import SelectTeamSkeleton from './skeleton';
import appStore from '../../stores/appStore';
import { plusVersion } from '../../utils';
import './index.scss';

interface IBetDialog<T = any> {
    open: boolean;
    setOpen?: any;
    type: number;
    onCallback?: (data: T) => void;
}

interface IAction {
    name?: string;
    icon?: string;
}

const useSelectTeam = ({ open, setOpen, type, onCallback = () => {} }: IBetDialog) => {
    const [data, setData] = useState([]);
    const [action, setAction] = useState<IAction>({});
    const [isLoading, setIsLoading] = useState(false);
    const [playerList, setPlayerList] = useState<Array<any>>([]);
    const refs = useRef<any>(null);
    const stateRef = useRef<any>(null);

    const handleClick = (e: Event) => {
        if (!refs.current || !stateRef.current) {
            stateRef.current = true;
            return;
        }
        if (!refs.current.contains(e.target as Node) && refs.current !== e.target) {
            setOpen(false);
        }
    };

    useEffect(() => {
        if (open) {
            setPlayerList([]);
            setIsLoading(true);
            document.addEventListener('click', handleClick);
            api.guessTeamList({}).then((res) => {
                setData(res);
                setIsLoading(false);
            });
        }
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [open]);

    const onConfirm = (obj: any) => {
        setAction(obj);
        if (type === 2) {
            getList(obj.id);
        } else {
            onCallback(obj);
            setOpen(false);
        }
    };
    const onPlayerConfirm = (obj: any) => {
        onCallback(obj);
        setOpen(false);
    };

    const onClosePlayer = (e: Event | any) => {
        e.stopPropagation();
        setPlayerList([]);
    };

    const getList = (teamId: string) => {
        appStore.setLoading(true);
        api.guessPlayerList({
            teamId,
        }).then((res) => {
            setPlayerList(res);
            appStore.setLoading(false);
        });
    };

    return {
        refs,
        type,
        open,
        data,
        playerList,
        action,
        isLoading,
        onConfirm,
        onPlayerConfirm,
        onClosePlayer,
    };
};

const SelectTeamMain = (props: IBetDialog) => {
    const { refs, type, data, playerList, action, isLoading, onConfirm, onPlayerConfirm, onClosePlayer } = useSelectTeam(props);
    if (isLoading) return <SelectTeamSkeleton />;
    return (
        <div ref={refs}>
            {playerList.length > 0 ? (
                //选择队员
                <>
                    <div className='SelectTeam-player-header'>
                        <div className='SelectTeam-player-avatar' onClick={onClosePlayer}>
                            <Img src={plusVersion('/images/quizPoints/ic_more.png')} className='SelectTeam-player-back' />
                            <div className='SelectTeam-list-img'>
                                <Img src={action.icon} className='SelectTeam-list-img-con' />
                            </div>
                            <div className='SelectTeam-player-avatar-name'>{action.name}</div>
                        </div>
                    </div>
                    <ul className='SelectTeam-player-list'>
                        {playerList.map((item: any, i: number) => {
                            return (
                                <li
                                    key={`playerList-list-${i}`}
                                    onClick={(e: Event | any) => {
                                        e.stopPropagation();
                                        onPlayerConfirm(item);
                                    }}
                                    className='SelectTeam-player-list-li'>
                                    <div className='SelectTeam-list-img'>
                                        <Img src={item?.icon} className='SelectTeam-list-img-con' />
                                    </div>
                                    <div className='SelectTeam-player-list-li-name'>{item?.name}</div>
                                </li>
                            );
                        })}
                        {Array.from(Array(4 - (playerList?.length % 4)), (_v, k) => k).map((_item, index) => {
                            return <li key={`SelectTeam-player-list-not-${index}`} className='SelectTeam-player-list-li' />;
                        })}
                    </ul>
                </>
            ) : (
                //选择队伍
                <ul className='SelectTeam-list'>
                    {data.map((item: any, i: number) => {
                        return (
                            <li
                                key={`SelectTeam-list-${i}`}
                                onClick={(e: Event | any) => {
                                    e.stopPropagation();
                                    onConfirm(item);
                                }}
                                className={classNames('SelectTeam-list-li')}>
                                <div className='SelectTeam-list-img'>
                                    <Img src={item?.icon} className='SelectTeam-list-img-con' />
                                </div>
                                <div className='SelectTeam-list-name'>{item?.name}</div>
                                {type === 2 && <Img src={plusVersion('/images/quizPoints/ic_more.png')} className='SelectTeam-list-more' />}
                            </li>
                        );
                    })}
                    {Array.from(Array(data?.length % 2), (_v, k) => k).map((_item, index) => {
                        return <li key={`SelectTeam-list-not-${index}`} className={classNames('SelectTeam-list-li')} />;
                    })}
                </ul>
            )}
        </div>
    );
};

const SelectTeam = (props: IBetDialog) => {
    return (
        <>
            {props.open && (
                <div className='SelectTeam'>
                    <SelectTeamMain {...props} />
                </div>
            )}
        </>
    );
};

export default memo(SelectTeam);
