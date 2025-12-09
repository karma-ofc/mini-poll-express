// Временное хранилище данных (в реальном проекте использовать базу данных)
let questions = [
  {
    id: 1,
    question: 'Какой язык программирования вы используете чаще всего?',
    options: ['JavaScript', 'Python', 'Java', 'C#', 'C++', 'PHP']
  },
  {
    id: 2,
    question: 'Что такое переменная в программировании?',
    options: ['Место для хранения данных', 'Функция', 'Класс', 'Цикл']
  },
  {
    id: 3,
    question: 'Какой оператор используется для сравнения в большинстве языков?',
    options: ['==', '=', '===', '!=']
  },
  {
    id: 4,
    question: 'Что такое цикл в программировании?',
    options: ['Повторение кода', 'Условное выполнение', 'Функция', 'Переменная']
  },
  {
    id: 5,
    question: 'Какой фреймворк вы предпочитаете для веб-разработки?',
    options: ['Express.js', 'Django', 'Spring', 'React', 'Angular']
  }
];

let answers = [];

// Получить все вопросы
const getQuestions = (req, res) => {
  let filteredQuestions = questions;
  const limit = req.query.limit ? parseInt(req.query.limit) : null;
  if (limit) {
    filteredQuestions = questions.slice(0, limit);
  }
  res.json(filteredQuestions);
};

// Получить вопрос по ID
const getQuestionById = (req, res) => {
  const id = parseInt(req.params.id);
  const question = questions.find(q => q.id === id);
  if (question) {
    res.json(question);
  } else {
    res.status(404).json({ error: 'Вопрос не найден' });
  }
};

// Добавить новый вопрос
const addQuestion = (req, res) => {
  const { question, options } = req.body;
  if (!question || !options || !Array.isArray(options)) {
    return res.status(400).json({ error: 'Неверные данные' });
  }
  const newQuestion = {
    id: questions.length + 1,
    question,
    options
  };
  questions.push(newQuestion);
  res.status(201).json(newQuestion);
};

// Отправить ответ
const submitAnswer = (req, res) => {
  const { questionId, answer } = req.body;
  if (!questionId || !answer) {
    return res.status(400).json({ error: 'Неверные данные' });
  }
  const newAnswer = {
    id: answers.length + 1,
    questionId,
    answer,
    timestamp: new Date()
  };
  answers.push(newAnswer);
  res.status(201).json(newAnswer);
};

// Обновить вопрос
const updateQuestion = (req, res) => {
  const id = parseInt(req.params.id);
  const { question, options } = req.body;
  const questionIndex = questions.findIndex(q => q.id === id);
  if (questionIndex === -1) {
    return res.status(404).json({ error: 'Вопрос не найден' });
  }
  if (!question || !options || !Array.isArray(options)) {
    return res.status(400).json({ error: 'Неверные данные' });
  }
  questions[questionIndex] = { id, question, options };
  res.json(questions[questionIndex]);
};

// Удалить вопрос
const deleteQuestion = (req, res) => {
  const id = parseInt(req.params.id);
  const questionIndex = questions.findIndex(q => q.id === id);
  if (questionIndex === -1) {
    return res.status(404).json({ error: 'Вопрос не найден' });
  }
  questions.splice(questionIndex, 1);
  res.status(204).send();
};

// Получить все ответы (для админа)
const getAnswers = (req, res) => {
  res.json(answers);
};

module.exports = {
  getQuestions,
  getQuestionById,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  submitAnswer,
  getAnswers
};