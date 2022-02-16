import React, {useCallback, useEffect} from "react";
import { useState } from "react";
import { useHttp } from "../../hooks/http-request";
import './ListQuiz.css';
import QuizItem from "../QuizItem/QuizItem";
import {Button, Grid, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";

export default function ListQuiz () {

    const {loading, request} = useHttp()

    const userId = localStorage.getItem('userId');
    const [listData, setListData] = useState<boolean>();

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
            if(data.quiz) {
                setListData(false);
                setList(data.quiz);
            } else {
                setListData(true);
            }
        } catch (e) { }
    },[request])

    useEffect(() => {
        getList()
    },[])

    return (
        <div className="listQuiz">
            {(listData) ? (
                <div className="addQuiz">
                <Typography variant="h4">
                    Ваших опросов в данный момент нет
                </Typography>
                <Button
                    variant="contained"
                >
                    <Link className='auth-form__link' to="/quiz/create">Создать тест</Link>
                    </Button>
                </div>
            ) : 
                <div className="quiz">
                    <Grid container columns={{xs: 1, md: 4 }}>
                        {list.map(key=>{
                            return(
                                <Grid item xs={1} md={1}>
                                    <QuizItem key={key._id} index={key._id} details={key}/>
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>
            }
        </div>
    );
}


