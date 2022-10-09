import React, { FC, useEffect, useState, lazy, Suspense } from 'react';
import Text from '@Components/Text';
import Img from 'elelive-ui/es/Components/Img';

interface IAward {
    list: Array<any>;
}

const Award = ({ list }: IAward) => {
    return (
        <div className='award'>
            {list.map((item, i) => {
                return (
                    <div key={`award-${i}`} className='award-li'>
                        <div className='award-li-title'>Lv{item.level}</div>
                        <ul className='award-li-ul'>
                            {item.children.length > 0 &&
                                item.children.map((item2: any, i2: number) => {
                                    return (
                                        <li key={`award-li-${i}-${i2}`} className='award-li-li'>
                                            <div className='award-li-li-box'>
                                                <Img src={item2.awardImage} webp={false} className='award-li-li-box-img' />
                                            </div>
                                            <div className='award-li-li-name'>{item2.awardName}</div>
                                            {item2.awardType !== 15 ? (
                                                <div className='award-li-li-validityPeriod'>
                                                    {item2.validityPeriod ? item2.validityPeriod + 'h' : <Text i18nKey='permanent'>永久</Text>}
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </li>
                                    );
                                })}
                            {Array.from(Array(4 - (item.children.length % 4)), (_v, k) => k).map((_item, index) => {
                                return <li className='award-li-li' key={`award-li-last-${i}-${index}`} />;
                            })}
                        </ul>
                    </div>
                );
            })}

            {/*{list.length}*/}
        </div>
    );
};

export default Award;
