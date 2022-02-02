import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import './QuizItem.css';


export default function QuizItem (props:any) {

    return (
        <div className="QuizItem">
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {props.details.title}
                    </Typography>

                    {/*<Typography sx={{ mb: 1.5 }} color="text.secondary" hidden={props.details.questions.length === 0}>*/}
                    {/*    Вопросы: {props.details.questions.length}*/}
                    {/*</Typography>*/}
                    {/*<Typography sx={{ mb: 1.5 }} color="text.secondary" hidden={props.details.timer === 0}>*/}
                    {/*    Время: {props.details.timer}*/}
                    {/*</Typography>*/}

                    <Typography variant="body2" hidden={props.details.description === ''}>
                        {props.details.description}
                    </Typography>

                    <FormGroup>
                        <FormControlLabel control={<Checkbox  />} label= {props.details.open? 'Открыт':'Закрыт'} />
                        <FormControlLabel control={<Checkbox  />} label= {props.details.privateQuiz? 'Приватный':'Общий'} />
                        <CardActions>
                            <Button size="small">Сохранить</Button>
                        </CardActions>
                    </FormGroup>
                </CardContent>

                <CardActions>
                    <Button variant="contained" size="medium">Редактировать</Button>
                </CardActions>
            </Card>
        </div>
    );
}