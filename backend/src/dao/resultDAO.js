import Result from '../models/Result.js';

export default class ResultDAO {
    static async getAllResultsByQuizId(req) {
        return await Result.find({ quizId: req.params.id })
    }

    static async createResultsByQuizId(quizId, userId, userName, userFullName, answers) {
        const result = new Result({ quizId, userId, userName, userFullName, answers });
        return await result.save();
    }
}