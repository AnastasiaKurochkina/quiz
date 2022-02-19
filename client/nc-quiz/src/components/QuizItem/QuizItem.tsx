import {Alert, Checkbox, FormControlLabel, FormGroup, Snackbar} from "@mui/material";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import './QuizItem.css';
import {Link} from "react-router-dom";
import * as React from "react";
import {useHttp} from "../../hooks/http-request";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

export default function QuizItem(props: any) {

    const {loading, request, error} = useHttp();

    const [deleted, setDeleted] = useState<boolean>(false);
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
    const deleteQuiz = async ()=>{
        console.log('delete')
        try {
            const data = await request(`/myquiz/delete/${props.details._id}`, 'DELETE');

            if(data.message == 'Quiz удален') {
                setDeleted(true)
                setTimeout(() => {
                    setDeleted(false);
                }, 6000);
            }
        } catch (e) {
        }
    }

    return (
        <div className="QuizItem">
            <Card sx={{ minWidth: 275}}>
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

                <CardActions sx={{display: "flex", justifyContent: "space-between"}}>
                    <Button component={Link} to={`edit/${props.details._id}`} variant="contained" href="myquiz/edit" size="medium">Редактировать</Button>
                    <IconButton aria-label="delete" size="large" >
                        <DeleteIcon onClick={deleteQuiz}/>
                    </IconButton>
                </CardActions>
            </Card>

            <Snackbar open={deleted} autoHideDuration={4000}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Quiz удален
                </Alert>
            </Snackbar>
        </div>
    );
}