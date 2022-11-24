import Img from 'elelive-ui/es/Components/Img';
import { isVoid } from '@Utils/index';
import reactI18n from 'min-react-i18n';
import './index.scss';

interface ListItemProps {
    index: number;
    img: string;
    integralValue: number;
    name: string;
    rank: number;
    liveState: number;
    handListItemClick: () => void;
}

const ListItem = ({ index, rank, img, name, integralValue, liveState, handListItemClick }: ListItemProps) => {
    return (
        <div className='lists-item'>
            <div className='lists-item-rank'>{rank || index}</div>
            <div
                className='lists-item-info'
                onClick={() => {
                    handListItemClick();
                }}>
                <div className='lists-info-img'>
                    <Img src={img} className='lists-img' xOssProcess='1x' />
                    {liveState === 1 && <span className='lists-live' />}
                </div>
                <div className='lists-info-name'>{name || reactI18n.get('ReserveSeatsForYou')}</div>
            </div>
            <div className='lists-item-integral'>{isVoid(integralValue) ? '-' : integralValue}</div>
        </div>
    );
};

export default ListItem;
