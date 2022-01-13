
import { Button, FormControl } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../../hooks/http-request";
import Quiz from "../../models/quiz";
import CurrentQuestion from "./Question";
import { useParams } from "react-router-dom";
import './Quiz.css';

const CurrentQuiz = () => {

   const { loading, request } = useHttp()
   const [quiz, setQuiz] = useState<Quiz>({
      title: '',
      questions: [],
      private: true
   });

   let params = useParams()

   const getQuiz = useCallback(async () => {
      try {
         const data = await request(`/quiz/${params.id}`, 'GET')
         setQuiz(data.quiz)
      } catch (e) { }
   }, [request])

   const listquestions = quiz.questions

   useEffect(() => {
      getQuiz()
   }, [])

   return (
      <div className="quiz">
         <FormControl>
            <div className="quiz-heading"> {quiz.title} </div>
            <h3> {quiz.description} </h3>
            {listquestions?.map(question =>
               <CurrentQuestion question={question} />
            )}
            <Button variant="text">
               Отправить
            </Button>
         </FormControl>
      </div>
   )

}
export default CurrentQuiz;