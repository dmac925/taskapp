const express     = require('express'),
    router        = express.Router(),
    controller    = require('../controllers/tasksController');


router.get('/', controller.findAll);

router.get('/categories', controller.findCategories);

router.get('/userTasksEmail', controller.findUserTasksEmail);

router.post('/userTasks', controller.findUserTasks);

router.post('/new', controller.insert);

router.post('/delete', controller.delete);

router.post('/update', controller.update);

router.get('/:task_id', controller.findOne);



module.exports = router;