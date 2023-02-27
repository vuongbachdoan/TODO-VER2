import { useState } from 'react';
import { TaskAdd } from '../task-add/TaskAdd';
import { CtButton } from '../../../../shared/components/Button/Button';
import { ReactComponent as AddIcon } from '../../../../assets/images/icon-add.svg';
import { ReactComponent as EditIcon } from '../../../../assets/images/icon-edit.svg';
import { ReactComponent as MoreIcon } from '../../../../assets/images/icon-more.svg';
import { ReactComponent as MoveIcon } from '../../../../assets/images/icon-grip.svg';
import { setTasks, updateTasks } from "../../../../redux/reducers/appReducer";

import './Body.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changDragPosition } from '../../../../shared/utils/changeDragPosition';

export const Body = () => {
    const [isAddTask, setAddTask] = useState(false);
    const tasks = useSelector((state) => state.appData.tasks);
    const dispatch = useDispatch()

    const handleTask = (isOpen, val) => {
        if (val !== null && val.title) {
            dispatch(setTasks({
                title: val.title,
                description: val.description,
                order: tasks.length
            }))
        }
        setAddTask(isOpen);
    }

    const [currentSellectedTask, setCurrentSelectedTask] = useState(-1);
    const [variance, setVariance] = useState(0);
    const [startY, setStartY] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const handleDraging = (e) => {
        e.preventDefault()
        setVariance(e.clientY - startY);
        setCurrentY(e.clientY);
    }
    const handleStartDrag = (e, index) => {
        setStartY(e.clientY);
        e.dataTransfer.setDragImage(e.target, window.outerWidth, window.outerHeight);
        setCurrentSelectedTask(index);
        console.log(`${index}: selected task`)
    }
    const handleStopDraging = () => {
        setVariance(0);
        let updatedTasks = changDragPosition(tasks, startY, currentY, currentSellectedTask, 60, 5);
        dispatch(updateTasks(updatedTasks));
        setCurrentSelectedTask(-1);
    }
    const handleDragLeave = () => {
        setVariance(0);
        setCurrentSelectedTask(-1);
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
                                    <li 
                                        key={index} 
                                        onDragStart={(e) => handleStartDrag(e, index)}
                                        onDrop={handleStopDraging}
                                        onDragOver={(e) => handleDraging(e)}
                                        onDragLeave={handleDragLeave}
                                        draggable
                                        className='ct__list-item' 
                                        style={{top: `${currentSellectedTask === task.order ? variance : 0}px`, zIndex: `${currentSellectedTask === task.order ? 1 : 0}`}}
                                    >
                                        <div className="row">
                                            <MoveIcon/>
                                            <input type="checkbox"  className='task_checkbox'/>
                                            <div>
                                                <h5 className="ct__list-item-title no-select">{task.title}</h5>
                                                <p className="ct__list-item-description no-select">{task.description}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="row task-actions">
                                                    <EditIcon />
                                                    <MoreIcon />
                                                </div>
                                                <div className="row">
                                                    <div className="tag no-select">Tag</div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    {!isAddTask && <CtButton onClick={() => handleTask(true, null)} data={{ description: 'Add task', prefixIcon: <AddIcon /> }} />}
                    {isAddTask && <TaskAdd onClick={(val) => handleTask(false, val)} />}
                </section>
            </div>
        </div>
    );
}