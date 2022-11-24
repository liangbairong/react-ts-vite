import { useState } from 'react';
import Toast from 'elelive-ui/es/Components/Toast';
import qpStore from '../stores/qpStore';
import appStore from '../stores/appStore';
import JSBridge from '../utils/JSBridge';
import Text from '../components/Text';
interface IUseBet<T = any> {
    type?: number;
    checkedCallback?: (data: T) => void;
}
const useBet = ({ type, checkedCallback = () => {} }: IUseBet) => {
    const [open, setOpen] = useState<boolean>(false);
    const { team, betItem, curType } = qpStore;
    const onChecked = (item: any, obj: any) => {
        qpStore.setBetItem(obj);
        qpStore.setCurType(type);
        checkedCallback(item);
    };
    const { accessToken } = appStore.auth;

    const onShowBetDialog = (newBetItem: any = {}) => {
        if (!accessToken) {
            JSBridge.toAppLogin();
            return;
        }

        console.log(curType);
        console.log(type);
        // if (curType !== type) {
        //     return;
        // }
        let tData = betItem;
        if (Object.keys(newBetItem).length > 0) {
            tData = newBetItem;
        }
        if (Object.keys(tData).length === 0 || curType !== type) {
            Toast.open({
                content: <Text i18nKey='PleaseSelect'>请选择</Text>,
            });
            return;
        }

        setOpen(true);
    };
    return {
        team,
        open,
        setOpen,
        onChecked,
        onShowBetDialog,
    };
};

export default useBet;
