import { CtButton } from "../../../../shared/components/Button/Button";
import { ReactComponent as CalendarIcon } from "../../../../assets/images/icon-calendar.svg";
import { ReactComponent as ClockIcon } from "../../../../assets/images/icon-clock.svg";
import { ReactComponent as TodayIcon } from "../../../../assets/images/icon-today.svg";

import './TaskAdd.scss';
import { CtDropdown } from "../../../../shared/Dropdown/Dropdown";

const btnsData = [
    {
        description: 'Due date',
        prefixIcon: <CalendarIcon />
    },
    {
        description: 'Reminders',
        prefixIcon: <ClockIcon />
    }
]

export const TaskAdd = ({onClick}) => {
    const handleClick = () => {
        onClick();
    }

    return (
        <div className="task-add">
            <input className="ct__input" type="text" placeholder="Task name" />
            <input className="ct__input" type="text" placeholder="Description" />
            <div className="row">
                {
                    btnsData.map((data) => {
                        return <CtButton data={data} />
                    })
                }
            </div>

            <div className="task-add__actions">
                <CtDropdown data={[
                    {label: "Today", prefixIcon: <TodayIcon/>},
                    {label: "Today", prefixIcon: <TodayIcon/>},
                    {label: "Today", prefixIcon: <TodayIcon/>},
                    {label: "Today", prefixIcon: <TodayIcon/>},
                    {label: "Today", prefixIcon: <TodayIcon/>},
                    {label: "Today", prefixIcon: <TodayIcon/>},
                ]}/>
                <div className="row">
                    <CtButton data={{description: 'Cancel', btnType: 'ct__btn-danger'}} onClick={handleClick}/>
                    <CtButton data={{description: 'Add task'}} onClick={handleClick}/>
                </div>
            </div>
            
        </div>
    );
}