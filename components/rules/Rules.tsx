import React from 'react';
import {RuleBeachball} from "./RuleBeachball";
import {RuleBasketball} from "./RuleBasketball"
import {RuleDodgeBall} from "@/components/rules/RuleDodgeBall";
import {RuleSoccer} from "@/components/rules/RuleSoccer";
import {RuleDodgebee} from "@/components/rules/RuleDodgebee";
import {RuleBadminton} from "@/components/rules/RuleBadminton";
import {RuleFutsal} from "@/components/rules/RuleFutsal";
import {RuleStrackout} from "@/components/rules/RuleStrackout";
import {RulePetanque} from "@/components/rules/RulePetanque";

export type RuleProps = {
    ruleId: number;
}

export const Rules = (props: RuleProps) => {
    const {ruleId} = props;
    if (ruleId === 1){return <RuleBeachball/>}
    if (ruleId === 2){return <RuleDodgebee/>}
    if (ruleId === 3){return <RuleBadminton/>}
    if (ruleId === 4){return <RuleFutsal/>}
    if (ruleId === 5){return <RuleStrackout/>}
    if (ruleId === 6){return <RulePetanque/>}

    return(<> </>)
}