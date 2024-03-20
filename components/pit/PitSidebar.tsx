import {Drawer, List, ListItem, ListItemButton, ListItemText} from "@mui/material";

export type PitSidebarProps = {
    isOpenSidebar: boolean,
    closeSidebarFunction: () => void,
}

type ContentType = {
    name: string,
    url: string,
}

export function PitSidebar(props: PitSidebarProps) {

    const contents: ContentType[] = [
        {
            name: "インフォメーション",
            url: "/admin/information",
        },
        {
            name: "チーム",
            url: "/admin/teams",
        },
        {
            name: "ユーザー",
            url: "/admin/users",
        },
        {
            name: "競技",
            url: "/admin/sports",
        },
        {
            name: "マッチ",
            url: "/admin/matches",
        },
        {
            name: "ロケーション",
            url: "/admin/locations",
        },
        {
            name: "画像",
            url: "/admin/images",
        },
        {
            name: "タグ",
            url: "/admin/tags",
        },
        {
            name: "Microsoftアカウント",
            url: "/admin/microsoft-accounts",
        },
    ]

    return (
        <Drawer
            open={props.isOpenSidebar}
            onClose={() => {
                props.closeSidebarFunction()
            }}
        >
            <List>
                {
                    contents.map((content, index) => {
                        return (
                            <ListItem key={index} disablePadding>
                                <ListItemButton href={content.url}>
                                    <ListItemText primary={content.name}/>
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
            </List>
        </Drawer>
    )
}