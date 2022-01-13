import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import React from "react";
import Question from "../../models/question";

const CurrentQuestion: React.FC<{ question: Question }> = (props) => {
    return (
        <div>
            <h3>{props.question.question}</h3>
            {props.question.type == 'single' &&
                <RadioGroup
                    aria-label="gender"
                    name="radio-buttons-group"
                >
                    {props.question.proposedAnswers.map(item =>
                        <FormControlLabel
                            value={item}
                            control={<Radio />}
                            label={item}
                        />
                    )}
                </RadioGroup>
            }
            {props.question.type == 'string' &&
                <TextField
                    id="outlined-basic"
                    label="Ваш ответ"
                    variant="outlined"
                />
            }
        </div>

    )
}
export default CurrentQuestion;