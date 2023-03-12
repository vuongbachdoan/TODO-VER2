import { useEffect, useState } from 'react';
import { TaskAdd } from '../task-add/TaskAdd';
import { CtButton } from '../../../../shared/components/Button/Button';
import { ReactComponent as AddIcon } from '../../../../assets/images/icon-add.svg';
import { ReactComponent as EditIcon } from '../../../../assets/images/icon-edit.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/images/delete.svg';
import { ReactComponent as MoveIcon } from '../../../../assets/images/icon-grip.svg';
import { setTasks, updateTasks } from "../../../../redux/reducers/appReducer";

import './Body.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changDragPosition } from '../../../../shared/utils/changeDragPosition';
import { TaskService } from '../../../../shared/services/taskService';

export const Body = () => {
    const [isAddTask, setAddTask] = useState(false);
    const tasks = useSelector((state) => state.appData.tasks);
    const currentWorkspace = useSelector((state) => state.appData.currentWorkspace);
    const dispatch = useDispatch()

    const handleTask = (isOpen, val) => {
        if (val !== null && val.title) {
            TaskService.createTask({
                workspaceId: currentWorkspace,
                title: val.title,
                description: val.description,
                dueDate: val.dueDate,
                tag: "me"
            }).then(res => dispatch(updateTasks(res.data.tasks)))
            
            
        }
        setAddTask(isOpen);
    }

    useEffect(() => {
        if(currentWorkspace !== "") {
            TaskService.getTasks(currentWorkspace)
            .then(res => {
                dispatch(updateTasks(res.data.tasks))
            })
        }
    }, [currentWorkspace])

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
    }
    const handleStopDraging = () => {
        setVariance(0);
        let updatedTasks = changDragPosition(tasks, startY, currentY, currentSellectedTask, 60, 8);
        dispatch(updateTasks(updatedTasks));
        setCurrentSelectedTask(-1);
    }
    const handleDragLeave = () => {
        setVariance(0);
        setCurrentSelectedTask(-1);
    }
    const handleDragEnter = (e) => {
        console.log(e.target)
    }

    const deleteTask = (task) => {
        TaskService.deleteTask(task.workspaceId, task._id)
            .then(
                () => {
                    TaskService.getTasks(task.workspaceId)
                        .then(
                            (res) => {
                                dispatch(updateTasks(res.data.tasks))
                            }
                        )
                }
            )
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
                                        style={{
                                            top: `${currentSellectedTask === task.order ? variance : 0}px`, 
                                            zIndex: `${currentSellectedTask === task.order ? 1 : 0}`,
                                            opacity: `${currentSellectedTask === task.order ? 50 : 80}%`,
                                            border: `${currentSellectedTask === task.order ? "1px dashed #ccc" : "0px"}%`
                                        }}
                                    >
                                        <div className="row">
                                            <MoveIcon/>
                                            <input type="checkbox"  className='task_checkbox'/>
                                            <div>
                                                <h5 className="ct__list-item-title no-select">{task.title}</h5>
                                                <p className="ct__list-item-description no-select">{task.description}</p>
                                                <p className="ct__list-item-description no-select">{new Date(task.dueDate).toLocaleString("en-US")}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="row task-actions">
                                                    <DeleteIcon onClick={() => deleteTask(task)}/>
                                                    <EditIcon />
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