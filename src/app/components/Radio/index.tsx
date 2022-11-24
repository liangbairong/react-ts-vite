import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import Img from 'elelive-ui/es/Components/Img';
import './index.scss';
interface IRadio {
    checked: boolean | number;
    onCut?: () => void;
}
const Radio = ({ checked, onCut = () => {} }: IRadio) => {
    const onClick = () => {
        onCut();
    };
    return <div className={classNames('radio', checked ? 'radio-on' : '')} onClick={onClick} />;
};

export default Radio;
