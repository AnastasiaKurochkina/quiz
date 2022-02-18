import React, {useCallback, useEffect} from "react";
import { useState } from "react";
import { useHttp } from "../../hooks/http-request";
import './ListQuiz.css';
import QuizItem from "../QuizItem/QuizItem";
import {Grid} from "@mui/material";

export default function ListQuiz () {

    const {loading, request} = useHttp()

    const userId = localStorage.getItem('userId');

    const [list, setList] = useState([{
        _id: '',
        title: '',
        description: '',
        private: false,
        open: true,
        userID: '',
        timer: 0,
        questions:[]
    }]);


    const getList = useCallback(async () => {
        try{
            const data = await request(`/myquiz/${userId}`, 'GET')
            setList(data.quiz)
        } catch (e) { }
    },[request])

    useEffect(() => {
        getList()
    },[userId])

    return (
        <div className="listQuiz">
            <div className="quiz">
                <Grid container columns={{xs: 1, md: 4 }}>
                    {list.map(key=>{
                        return(
                            <Grid key={key._id} item xs={1} md={1}>
                                <QuizItem key={key._id} index={key._id} details={key}/>
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        </div>
    );
}


