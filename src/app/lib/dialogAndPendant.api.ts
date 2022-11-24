import { useFetch } from '../hooks';
import { http } from './http';
import { GiftPackPopup, AnchorChallengePandant, TeamList } from './api.types';

const dialogAndPendantApi = {
    // 礼包弹窗
    async useGiftPackPopup() {
        return await http<GiftPackPopup>({
            url: '/package/popup',
            method: 'post',
        });
    },
    // 领取礼包
    async useReceiveGiftPack(data: { uid: string }) {
        return await http<GiftPackPopup>({
            url: '/package/receive',
            method: 'post',
            data,
        });
    },
    // 主播挑战
    useAnchorChanllengePendant(data: { anchorId: string }) {
        return useFetch<AnchorChallengePandant>({
            url: '/ee/upgrade/getPendent',
            method: 'post',
            data,
        });
    },
    // 主播挑战-支持球队
    async useHttpAnchorChanllengeSupport(data: { anchorId: string; teamId: string }) {
        return await http({
            url: '/ee/upgrade/support',
            method: 'post',
            data,
        });
    },
    // 主播挑战-球队列表
    useAnchorChanllengeTeamList() {
        return useFetch<TeamList>({
            url: '/ee/upgrade/teamList',
            method: 'post',
        });
    },
};

export default dialogAndPendantApi;
