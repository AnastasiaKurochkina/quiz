import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import './QuizItem.css';
import {Link} from "react-router-dom";
import * as React from "react";
import {useHttp} from "../../hooks/http-request";
import {useState} from "react";

export default function QuizItem(props: any) {

    const {loading, request, error} = useHttp();

    const [checked, setChecked] = useState({
            privateQuiz: props.details.privateQuiz,
            open: props.details.open
    });

    const savePermission = async()=>{
        let checkedPermission = {
            _id: props.details._id,
            title: props.details.title,
            description: props.details.description,
            privateQuiz: checked.privateQuiz,
            open: checked.open,
            userId: props.details.userId,
            timer: props.details.timer,
            questions:props.details.questions,
            __v: props.details.__v
        }

        try {
            const data = await request(`/myquiz/edit/${props.details._id}`, 'PUT', checkedPermission);
            alert(data.message);
        } catch (e) {
        }
    }

    return (
        <div className="QuizItem">
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {props.details.title}
                    </Typography>
                    <Typography variant="body2" hidden={props.details.description === ''}>
                        {props.details.description}
                    </Typography>

                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label={props.details.open ? 'Открыт' : 'Закрыт'} />
                        <FormControlLabel control={<Checkbox />} label={props.details.privateQuiz ? 'Приватный' : 'Общий'} />
                        <CardActions>
                            <Button size="small">Сохранить</Button>
                            <Button size="small"  >
                                <Link className='quiz-cars__link' to={`/results/${props.details._id}`}> Результаты </Link>
                            </Button>
                        </CardActions>
                    </FormGroup>
                </CardContent>

                <CardActions>
                    <Button component={Link} to={`edit/${props.details._id}`} variant="contained" href="myquiz/edit" size="medium">Редактировать</Button>
                </CardActions>
            </Card>
        </div>
    );
}