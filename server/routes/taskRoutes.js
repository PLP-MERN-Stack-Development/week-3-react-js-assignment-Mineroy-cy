import express from 'express';
import {
  getTasks,
  createTask,
  deleteTask,
  toggleTask
} from '../controllers/taskController.js';

const router = express.Router();

router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .delete(deleteTask)
  .patch(toggleTask);

export default router;
