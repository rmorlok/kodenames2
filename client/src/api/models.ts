import {ApiUser} from "./auth";

export type Team = 'red' | 'blue' | 'undecided';

export type Player = {
    team: Team;
    user: ApiUser;
    isSpyMaster: boolean;
};