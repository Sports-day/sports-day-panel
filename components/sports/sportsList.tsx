import {Sport} from "@/src/models/SportModel";
import {SportCard} from "@/components/sports/sportsCard"
import {Stack} from "@mui/material";

export type SportsListProps = {
    sports: Sport[]
}

export default function SportsList(props: SportsListProps) {
    props.sports.sort((a, b) => b.weight - a.weight);
    return (
        <>
            <Stack direction="row" spacing={10} padding={2} alignItems="center" justifyContent="center">


                {props.sports.map((sport) => (
                    <SportCard
                        key={sport.id}
                        img={`${process.env.NEXT_PUBLIC_API_URL}/images/${sport.iconId}/file`}
                        link={`/information/${sport.id}`}
                    >
                        {sport.name}
                    </SportCard>
                ))}
            </Stack>
        </>
    )
}
