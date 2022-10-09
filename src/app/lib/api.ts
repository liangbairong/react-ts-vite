import { useFetch, http } from './http';
/* api统一定义 */
const api = {
    useDetail(data: any) {
        return useFetch({
            url: '/ee/growth/anchor/detail',
            method: 'post',
            data,
        });
    },
    useList(data: any, isOpen: boolean) {
        return useFetch({
            url: isOpen ? '/ee/growth/config/getPrizeByLevelType' : null,
            method: 'post',
            data,
        });
    },
};

export default api;
