import React, { FC, useEffect, useState, lazy, Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import './index.scss';
import {Text} from "@Components/Text";

const HomeView: FC = (): JSX.Element => {


    return (
        <div>
            pages-index
            <Text i18nKey={'Tothelatterone'}>sss</Text>
        </div>
    );
};


export default HomeView;
