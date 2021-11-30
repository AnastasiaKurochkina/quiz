import ResultDAO from '../dao/resultDAO.js';
import QuizDAO from '../dao/quizDAO.js';

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

            const quiz = await QuizDAO.getQuiz(req);
            const answers = req.body.answers;

            const results = await ResultDAO.createResultsByQuizId(quiz.id, quiz.userId, answers);

            if(!results) {
                return res.status(400).json({ message: 'Результаты не были записаны' })
            }

            res.status(201).json({ message: 'Результаты были записаны', results });
    
        } catch (err) {
            res.status(500).json({ message: '500 ошибка' })
        }
    }
}