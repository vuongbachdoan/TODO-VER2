import { CtButton } from "../../../../shared/components/Button/Button";
import { CtDropdown } from "../../../../shared/components/Dropdown/Dropdown";
import { ReactComponent as CalendarIcon } from "../../../../assets/images/icon-calendar.svg";
import { ReactComponent as ClockIcon } from "../../../../assets/images/icon-clock.svg";
import { ReactComponent as TodayIcon } from "../../../../assets/images/icon-today.svg";

import './TaskAdd.scss';
import { CtInput } from "../../../../shared/components/Input/Input";
import { useState } from "react";

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

    const [title, setTitle] = useState('');
    const handleTitle = (val) => {
        setTitle(val)
    }

    const [description, setDescription] = useState('');
    const handleDescription = (val) => {
        setDescription(val)
    }

    const handleClick = () => {
        onClick({
            title: title,
            description: description
        });
    }

    return (
        <div className="task-add">
            <CtInput data={{label: "Task name", required: true, getInput: (val) => handleTitle(val)}}/>
            <CtInput data={{label: "Description", required: false, class: "ct__mt-0", getInput: (val) => handleDescription(val)}}/>
            <div className="row">
                {
                    btnsData.map((data, index) => {
                        return <CtButton key={index} data={data} />
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