import { isVoid } from '@Utils/index';
import Img from 'elelive-ui/es/Components/Img';
import './index.scss';

interface ListBottomProps {
    img: string;
    integralValue: number;
    name: string;
    rank: number;
}

const ListBottom = ({ rank, img, name, integralValue }: ListBottomProps) => {
    return (
        <div className='lists-bottom'>
            <div className='lists-item-rank'>{rank > 99 ? '99+' : rank}</div>
            <div className='lists-item-info'>
                <div className='lists-info-img'>
                    <Img src={img} className='lists-img' xOssProcess='1x' />
                </div>
                <div className='lists-info-name'>{name}</div>
            </div>
            <div className='lists-item-integral'>{isVoid(integralValue) ? '-' : integralValue}</div>
        </div>
    );
};

export default ListBottom;
