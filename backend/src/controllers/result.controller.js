import ResultDAO from '../dao/resultDAO.js';
import QuizDAO from '../dao/quizDAO.js';
import UsersDAO from '../dao/usersDAO.js';

export default class ResultController {
    static async getAllResultsByQuizId(req, res) {
        try {

            const results = await ResultDAO.getAllResultsByQuizId(req);
        
            if(!results) {
                return res.status(400).json({ message: 'Результаты не были получены' })
            }

            res.status(201).json({ message: 'Результаты были получены', results });
    
        } catch (err) {
            res.status(500).json({ message: '500 ошибка' })
        }
    }

    static async createResultsByQuizId(req, res) {
        try {

            const quiz = await QuizDAO.getQuiz(req); //получаю квиз по id
            const answers = req.body.answers; //записываю ответы на вопросы

            let name, fullname, userId;

            for (let i in answers) {
                let answer = answers[i].answer.trim().toLowerCase().split(" ");
                let correctAnswer = quiz.questions[i].correctAnswer.trim().toLowerCase().split(" ");
                
                answers[i].answer = answer[i] === correctAnswer[i];
            }

            if(req.body.userId) {
                const user = await UsersDAO.getUserByUserId(req.body.userId); //получение пользователя
                name = user.name;
                fullname = user.fullname;
                userId = req.body.userId;
            } else {
                name = "Анонимный",
                fullname = "Пользователь",
                userId = null;
            }

            const results = await ResultDAO.createResultsByQuizId(req.body.quizId, userId, name, fullname, answers);

            if(!results) {
                return res.status(400).json({ message: 'Результаты не были записаны' })
            }

            res.status(201).json({ message: 'Результаты были записаны' });
    
        } catch (err) {
            res.status(500).json({ message: '500 ошибка' })
        }
    }
}