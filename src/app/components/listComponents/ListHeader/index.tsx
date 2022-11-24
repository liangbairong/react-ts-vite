import Text from '@Components/Text';
import { debounce } from 'lodash';
import { plusVersion } from '@Utils/index';
import CountDown from 'elelive-ui/es/Components/CountDown';
import Img from 'elelive-ui/es/Components/Img';
import './index.scss';

type ListHeaderProps = {
    state: number;
    endDate: number;
    btnRefresh: () => void;
    refresh: () => void;
};

const ListHeader = ({ state, endDate, btnRefresh, refresh }: ListHeaderProps) => {
    switch (state) {
        case 1: {
            return (
                <div className='list-header'>
                    <div>
                        <Text i18nKey='FromTheEnd'>距本轮结束</Text>{' '}
                        <small>
                            {endDate ? (
                                <CountDown
                                    ROOT_BASE={ROOT_BASE}
                                    endTime={endDate}
                                    onHandCountDownEvent={() => {
                                        refresh();
                                    }}
                                />
                            ) : (
                                ''
                            )}
                        </small>
                    </div>
                    <Img
                        className='refresh-btn'
                        src={plusVersion('/images/common/refresh.png')}
                        onClick={debounce(() => {
                            btnRefresh();
                        }, 200)}
                    />
                </div>
            );
        }
        case 10: {
            return (
                <div className='list-header'>
                    <Text i18nKey='ThisRoundEnded'>本轮已结束</Text>
                </div>
            );
        }
        default: {
            return <></>;
        }
    }
};

export default ListHeader;
