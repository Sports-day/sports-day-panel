import React from 'react';
import {RuleBeachball} from "./RuleBeachball";
import {RuleDodgebee} from "./RuleDodgebee";
import {RuleBadminton} from "./RuleBadminton"
import {RuleKickbase} from "./RuleKickbase"
import {RuleStrackout} from "./RuleStrackout";
import {RulePetanque} from "./RulePetanque";

export type RuleProps = {
    sportId: number;
}

export const Rules = (props: RuleProps) => {
    const {sportId} = props;
    if (sportId === 1){return <RuleBeachball/>}
    if (sportId === 2){return <RuleBadminton/>}
    if (sportId === 3){return <RuleKickbase/>}
    if (sportId === 4){return <RulePetanque/>}
    if (sportId === 5){return <RuleStrackout/>}
    if (sportId === 6){return <RuleDodgebee/>}
    return(<> </>)
}