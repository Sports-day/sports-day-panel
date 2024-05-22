import React from 'react';
import {RuleBeachball} from "./RuleBeachball";
import {RuleDodgebee} from "./RuleDodgebee";
import {RuleBasketball} from "./RuleBasketball"
import {RuleKickbase} from "./RuleKickbase"
import {RuleStrackout} from "./RuleStrackout";
import {RulePetanque} from "./RulePetanque";

export type RuleProps = {
    ruleId: number;
}

export const Rules = (props: RuleProps) => {
    const {ruleId} = props;
    if (ruleId === 1){return <RuleBeachball/>}
    if (ruleId === 2){return <RuleDodgebee/>}
    if (ruleId === 3){return <RuleBasketball/>}
    if (ruleId === 4){return <RuleKickbase/>}
    if (ruleId === 5){return <RuleStrackout/>}
    if (ruleId === 6){return <RulePetanque/>}
    return(<> </>)
}