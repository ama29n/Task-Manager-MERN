const express = require('express');
const router = express.Router();

const {getAllTasks, createTask, getOneTask, updateTask, deleteTask} = require('../Controllers/controllers');

router.route('/').get(getAllTasks);

router.route('/').post(createTask);

router.route('/:id').get(getOneTask);

router.route('/:id').patch(updateTask);

router.route('/:id').delete(deleteTask);

module.exports = router;