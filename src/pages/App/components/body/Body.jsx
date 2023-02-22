import { useState } from 'react';
import { TaskAdd } from '../task-add/TaskAdd';
import { CtButton } from '../../../../shared/components/Button/Button';
import { ReactComponent as AddIcon } from '../../../../assets/images/icon-add.svg';
import { ReactComponent as EditIcon } from '../../../../assets/images/icon-edit.svg';
import { ReactComponent as MoreIcon } from '../../../../assets/images/icon-more.svg';

import './Body.scss';

export const Body = () => {
    const [isAddTask, setAddTask] = useState(false);

    const [tasks, setTasks] = useState([]);
    const handleTask = (isOpen, val) => {
        if(val !== {}) {
            setTasks(...tasks, val)
        }
        setAddTask(isOpen);
    }

    return (
        <div className="body">
            <div className="app-body-editor">
                <section className='task-section'>
                    <h4>Title Section</h4>
                    <ul className='ct__list list-tasks'>
                        {
                            tasks.map((task, index) => {
                                return (
                                    <li key={index} className='ct__list-item cursor-pointer'>
                                        <div className="row">
                                            <input type="checkbox" />
                                            <p className="task">{task}</p>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="row task-actions">
                                                    <EditIcon />
                                                    <MoreIcon />
                                                </div>
                                                <div className="row">
                                                    <div className="tag">Tag</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    { !isAddTask && <CtButton onClick={() => handleTask(true, {})} data={{description: 'Add task', prefixIcon: <AddIcon />}}/> }
                    { isAddTask && <TaskAdd onClick={(val) => handleTask(false, val)}/> }
                </section>
            </div>
        </div>
    );
}