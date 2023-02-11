import { ReactComponent as EditIcon } from '../../../../assets/images/icon-edit.svg';
import { ReactComponent as MoreIcon } from '../../../../assets/images/icon-more.svg';
import { CtButton } from '../../../../shared/components/Button/Button';
import { ReactComponent as AddIcon } from '../../../../assets/images/icon-add.svg';

import './Body.scss';
import { useSelector } from 'react-redux';
import { TaskAdd } from '../task-add/TaskAdd';

const data = {
    description: 'Add task',
    prefixIcon: <AddIcon />
}

export const Body = () => {
    const tasks = useSelector((state) => state.appData.tasks);

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
                    <CtButton data={data} />
                    <TaskAdd/>
                </section>
            </div>
        </div>
    );
}