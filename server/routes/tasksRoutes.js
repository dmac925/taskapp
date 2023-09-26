const express     = require('express'),
    router        = express.Router(),
    controller    = require('../controllers/tasksController');


router.get('/', controller.findAll);

router.get('/:task_id', controller.findOne);

router.post('/new', controller.insert);

router.post('/delete', controller.delete);

router.post('/update', controller.update);

module.exports = router;