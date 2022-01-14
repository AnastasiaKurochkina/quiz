import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useHttp } from "../../hooks/http-request";
import './AddQuiz.css';

export default function AddQuiz() {

    const {loading,request} = useHttp();
    
    const [quiz, setQuiz] = useState('');

    const userId = localStorage.getItem('userId');

    const changeHandler = (newQuiz: any) => {
        setQuiz(newQuiz);
    }

    const createQuiz = async() => {
        let parseQuiz = {
            ...JSON.parse(quiz),
            userId
        }

        try {
            const data = await request('/quiz/create', 'POST', parseQuiz);
            alert(data.message);
        } catch (e) {
        }
    }

    return (
        <div className="addQuiz">
            <AceEditor
                height="700px"
                width="650px"
                mode="javascript"
                theme="github"
                onChange={changeHandler}
                name="addQuiz"
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
                    Создать тест
                </Button>
            </div>
        </div>
    );
}