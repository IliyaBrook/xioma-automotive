import { deleteTask } from '@services/tasks/deleteTask'
import { getTask } from '@services/tasks/getTaskById'
import { getUserTasks } from '@services/tasks/getUserTasks'
import { createTask } from '@services/tasks/createTask'
import { updateTask } from '@services/tasks/updateTask'
import { Router } from 'express'

const router = Router();

// task routes
router.post('/', createTask);
router.put('/', updateTask);
router.delete('/:id', deleteTask);
router.get('/', getUserTasks);
router.get('/:id', getTask);

export default router;