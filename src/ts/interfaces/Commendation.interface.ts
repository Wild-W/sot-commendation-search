type Commendation = {
    name: string,
    imageUrl: string,
    rewards: Rewards,
    description: string,
    gradeRequirements: string[],
    timeLimited: boolean,
};

type Rewards = {
    html: string,
    items: RewardItem[],
    doubloons: number,
};

type RewardItem = {
    name: string,
    imageUrl: string,
    wikiPageUrl: string,
};

export type {
    Commendation,
    Rewards,
    RewardItem,
}
