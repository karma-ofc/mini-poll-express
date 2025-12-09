const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');

// GET /api/questions - получить все вопросы
router.get('/questions', pollController.getQuestions);

// GET /api/questions/:id - получить вопрос по ID
router.get('/questions/:id', pollController.getQuestionById);

// POST /api/questions - добавить новый вопрос
router.post('/questions', pollController.addQuestion);

// PUT /api/questions/:id - обновить вопрос
router.put('/questions/:id', pollController.updateQuestion);

// DELETE /api/questions/:id - удалить вопрос
router.delete('/questions/:id', pollController.deleteQuestion);

// POST /api/answers - отправить ответ
router.post('/answers', pollController.submitAnswer);

// GET /api/answers - получить все ответы (для админа)
router.get('/answers', pollController.getAnswers);

module.exports = router;