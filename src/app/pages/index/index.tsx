import React, {FC, useEffect, useState, lazy, Suspense} from 'react';
import {useHistory} from 'react-router-dom';

import {Text} from "@Components/Text";
import Img from 'elelive-ui/es/Components/Img';
import './index.scss';
console.log(import.meta.env.VITE_VERSION)

import {getImgUrl} from "../../utils";

const HomeView: FC = (): JSX.Element => {


    return (
        <div>
            <div className='box'></div>
            pages-index
            <Text i18nKey={'Tothelatterone'}>sss</Text>
            <img src={getImgUrl('/images/no-data.png')} className={'aaa'}/>
        </div>
    );
};


export default HomeView;
