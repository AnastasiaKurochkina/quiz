import mongoose from "mongoose";
const { Types } = mongoose;
const { Schema } = mongoose;

const ResultSchema = new Schema({
    quizId: {type: Types.ObjectId, ref: 'Quiz'},
    userId: {type: Types.ObjectId, ref: 'Users'},
    answers: [{
        questionId: {type: Types.ObjectId, ref: "Quiz.questions.questionId"},
        answer: {type: Boolean, required: true}
    }]
})

const ResultModel = mongoose.model("Result", ResultSchema, "Results");
export default ResultModel