import { useState } from 'react';
import { useSelector } from 'react-redux';
import { TaskAdd } from '../task-add/TaskAdd';
import { CtButton } from '../../../../shared/components/Button/Button';
import { ReactComponent as AddIcon } from '../../../../assets/images/icon-add.svg';
import { ReactComponent as EditIcon } from '../../../../assets/images/icon-edit.svg';
import { ReactComponent as MoreIcon } from '../../../../assets/images/icon-more.svg';

import './Body.scss';

export const Body = () => {
    const tasks = useSelector((state) => state.appData.tasks);
    const [isAddTask, setAddTask] = useState(false);
    const setTask = (val) => {
        setAddTask(val)
    }

    return (
        <div className="body">
            <div className="app-body-editor">
                <section className='task-section'>
                    <h5>Title Section</h5>
                    <ul className='ct__list list-tasks'>
                        {
                            tasks.map((task) => {
                                return (
                                    <li className='ct__list-item cursor-pointer'>
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
                    { !isAddTask && <CtButton onClick={() => setTask(true)} data={{description: 'Add task', prefixIcon: <AddIcon />}}/> }
                    { isAddTask && <TaskAdd onClick={() => setTask(false)}/> }
                </section>
            </div>
        </div>
    );
}