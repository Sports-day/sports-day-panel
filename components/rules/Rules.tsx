import React from 'react';
import {RuleBeachball} from "./RuleBeachball";
import {RuleBasketball} from "./RuleBasketball"
import {RuleDodgeBall} from "@/components/rules/RuleDodgeBall";
import {RuleSoccer} from "@/components/rules/RuleSoccer";

export type RuleProps = {
    ruleId: number;
}

export const Rules = (props: RuleProps) => {
    const {ruleId} = props;
    if (ruleId === 1){return <RuleBasketball/>}
    if (ruleId === 2){return <RuleDodgeBall/>}
    if (ruleId === 3){return <RuleBeachball/>}
    if (ruleId === 4){return <RuleSoccer/>}
    return(<> </>)
}