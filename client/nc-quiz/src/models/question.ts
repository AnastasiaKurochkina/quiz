export default interface Question {
    _id: string;
    question: string;
    type: "single" | "text";
    proposedAnswers: string[];
    correctAnswer: string;
};
