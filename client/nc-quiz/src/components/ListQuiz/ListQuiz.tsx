import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useHttp } from "../../hooks/http-request";
import './ListQuiz.css';
import QuizItem from "../QuizItem/QuizItem";
import { Button, CircularProgress, Dialog, DialogActions, DialogTitle, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function ListQuiz() {

    const { loading, request } = useHttp()

    const userId = localStorage.getItem('userId');

    const [list, setList] = useState([{
        _id: '',
        title: '',
        description: '',
        private: false,
        open: true,
        userID: '',
        timer: 0,
        questions: []
    }]);
    const [openDialog, setOpenDialog] = useState<boolean>(true);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const getList = useCallback(async () => {
        try {
            const data = await request(`/myquiz/${userId}`, 'GET')
            setList(data.quiz)
        } catch (e) { }
    }, [request])

    useEffect(() => {
        getList()
    }, [userId])


    if(loading) {
        return <CircularProgress />
    }

    return (
        <>
            {list &&
                <div className="listQuiz">
                    <div className="quiz">
                        <Grid container columnSpacing={{ xs: 4, md: 12 }} columns={{ xs: 4, sm: 8, md: 4 }}>
                            {list.map(key => {
                                return (
                                    <Grid key={key._id} item xs={4} sm={3} md={1}>
                                        <QuizItem key={key._id} index={key._id} details={key} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </div>
                </div>
            }
            {!list.length && 
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                >
                    <DialogTitle>{"Созданных опросов еще нет!"}</DialogTitle>
                    <DialogActions>
                        <Button>
                            <Link className="listQuiz-dialog__link" to="/quiz/create"> Создать опрос </Link>
                        </Button>
                        <Button onClick={handleCloseDialog}>
                            ОК
                        </Button>
                    </DialogActions>
                </Dialog>
            }

        </>

    );
}


