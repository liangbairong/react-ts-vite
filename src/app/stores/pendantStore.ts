import { observable } from 'mobx';

export interface IPendantStore {
    team: any;
    setTeam: (value: any) => void;
}

const pendantStore = observable<IPendantStore>({
    team: {}, // 选择球队
    setTeam(value) {
        this.team = value;
        return this;
    },
});
export default pendantStore;
