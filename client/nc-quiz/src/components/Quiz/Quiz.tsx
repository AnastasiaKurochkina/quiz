
import { Box, Button, FormControl } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../../hooks/http-request";
import Quiz from "../../models/quiz";
import CurrentQuestion from "./Question";
import { useParams } from "react-router-dom";
import './Quiz.css';
import Answer from "../../models/answer";
import Result from "../../models/result";
import Auth from "../Auth/Auth";

const CurrentQuiz = () => {
   const { request } = useHttp()
   const [quiz, setQuiz] = useState<Quiz>({})

   let params = useParams()

   const getQuiz = useCallback(async () => {
      try {
         const data = await request(`/quiz/${params.id}`, 'GET')
         console.log(data.quiz)
         setQuiz(data.quiz)
      } catch (e) { }
   }, [request])

   const listquestions = quiz.questions

   useEffect(() => {
      getQuiz()
   }, [])

   const [result, setResult] = useState<Result>({
      quizId: `${params.id}`,
      userId: `${localStorage.getItem('userId')}`,  
      answers: []
   })

   const handleAnswer = (answer: Answer) => {
      let newAnswers: Answer[] = result.answers
      for (let item of result.answers) {
         if (answer.questionId == item.questionId) {
            newAnswers = result.answers.filter((item) => item.questionId !== answer.questionId)
         }
      }
      setResult((prevState: Result) => ({
         ...prevState,
         answers: [...newAnswers, answer]
      })
      )
   }

   const handleResult = async () => {
      try {
         console.log(result)
         const data = await request(`/quiz/${params.id}/result`, 'POST', { ...result })
         console.log(data)
      } catch (e) {
      }
   }

   if (quiz.private == true && localStorage.getItem('userId') == null) {
      return <Auth quiz={quiz._id} />
   }

   return (
      <div className="quiz">
         <FormControl>
            <div className="quiz-heading">
               <div className="quiz-heading-title"> {quiz.title} </div>
               <h3 > {quiz.description} </h3>
            </div>
            {listquestions?.map(question =>
               <CurrentQuestion question={question} key={question._id}
                  onSelectAnswer={handleAnswer}
               />
            )}
            <Box textAlign='center'>
               <Button
                  variant="contained"
                  sx={{ mt: 3, bgcolor: '#1a237e', width: '350px', }}
                  onClick={handleResult}
               >
                  Отправить
               </Button>
            </Box>
         </FormControl>
      </div>
   )

}
export default CurrentQuiz;
