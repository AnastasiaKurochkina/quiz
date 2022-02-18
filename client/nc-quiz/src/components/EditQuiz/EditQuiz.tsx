import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import Button from "@mui/material/Button";
import {useCallback, useEffect, useState} from "react";
import { useHttp } from "../../hooks/http-request";
import {useParams} from "react-router-dom";
import Quiz from "../../models/quiz";

export default function EditQuiz(){

    const {loading, request} = useHttp();

    const [initial, setInitial] = useState('');

    const userId = localStorage.getItem('userId');

    const changeHandler = (newQuiz: any) => {
        setInitial(newQuiz);
    }

    const createQuiz = async() => {
        let parseQuiz = {
            ...JSON.parse(initial),
            userId
        }

        try {
            const data = await request(`/myquiz/edit/${params.id}`, 'PUT', parseQuiz);
            alert(data.message);
        } catch (e) {
        }
    }

    let params = useParams()

    const getQuiz = useCallback(async () => {
        try {
            const data = await request(`/quiz/${params.id}`, 'GET')
            setInitial(JSON.stringify(data.quiz, null, " "));
        } catch (e) { }
    }, [request])

    useEffect(() => {
        getQuiz()
    }, [])

    return (
        <div className="addQuiz">
            <AceEditor
                height="700px"
                width="650px"
                mode="json"
                theme="github"
                value={initial}
                onChange={changeHandler}
                name="editQuiz"
                editorProps={{ $blockScrolling: true }}
                fontSize={14}
                setOptions={{
                    useWorker: false,
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true
                }}
            />
            <div className="addQuiz-btn">
                <Button
                    variant="contained"
                    onClick={createQuiz}
                >
                    Сохранить изменения
                </Button>
            </div>
        </div>
    );
}
