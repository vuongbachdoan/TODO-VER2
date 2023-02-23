import { ReactComponent as DeleteIcon } from "../../assets/images/delete.svg";
import { ReactComponent as MessageIcon } from "../../assets/images/message.svg";
import { ReactComponent as RestIcon } from "../../assets/images/rest.svg";
import { ReactComponent as NoteIcon } from "../../assets/images/noteadd.svg";
import { ReactComponent as PersonalCardIcon } from "../../assets/images/personalcard.svg";
import { ReactComponent as ProfileIcon } from "../../assets/images/profile.svg";
import { ReactComponent as WorkspaceIcon } from "../../assets/images/workspace.svg";
import { ReactComponent as MusicPlayer } from "../../assets/images/musicplay.svg";

const ICONS__MAP = [
    {
        name: "ic-delete",
        icon: <DeleteIcon/>
    },
    {
        name: "ic-message",
        icon: <MessageIcon/>
    },
    {
        name: "ic-rest",
        icon: <RestIcon/>
    },
    {
        name: "ic-note",
        icon: <NoteIcon/>
    },
    {
        name: "ic-personal_card",
        icon: <PersonalCardIcon/>
    },
    {
        name: "ic-profile",
        icon: <ProfileIcon/>
    },
    {
        name: "ic-workspace",
        icon: <WorkspaceIcon/>
    },
    {
        name: "ic-music_play",
        icon: <MusicPlayer/>
    }
]

export const RenderIcon = (key) => {
    return (ICONS__MAP.find((item) => item.name === `ic-${key}`))?.icon
}