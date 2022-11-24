import './index.scss';

interface ListTitleProps {
    ListTitleArr: string[];
}

const ListTitle = ({ ListTitleArr = [] }: ListTitleProps) => {
    return (
        <div className='lists-title'>
            <div className='lists-title-rank'>{ListTitleArr[0]}</div>
            <div className='lists-title-name'>{ListTitleArr[1]}</div>
            <div className='lists-title-integral'>{ListTitleArr[2]}</div>
        </div>
    );
};

export default ListTitle;
