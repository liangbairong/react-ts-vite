import React, { FC, useEffect, useState, lazy, Suspense } from 'react';
import { useHistory } from 'react-router-dom';

import {Text} from "@Components/Text";
import Img from 'elelive-ui/es/Components/Img';
import './index.scss';
// import bg from '@Assets/images/no-data.png'

const HomeView: FC = (): JSX.Element => {


    return (
        <div>
            <div className='box'></div>
            pages-index
            <Text i18nKey={'Tothelatterone'}>sss</Text>

            <Img src={new URL('../../../assets/images/no-data.png', import.meta.url).href}/>
            {/*<img src={'../../../assets/images/no-data.png'}/>*/}
        </div>
    );
};


export default HomeView;
