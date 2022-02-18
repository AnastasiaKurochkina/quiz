import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../../hooks/http-request";
import Answer from "../../models/answer";
const Results = () => {
    const { request } = useHttp()
    let params = useParams()
    const [result, setResult] = useState({})
    let count = 0;
    const resultHandler = useCallback(async () => {
        try {
            const data = await request(`/myquiz/${params.id}/result`, 'GET')
            const result = data.results
            result.forEach(((result: { answers: Answer[]; userFullName: any; }) => {
                const correctAnswers = countCorrectAnswers(result.answers)
                setResult((prevState: any) => ({
                    ...prevState,
                    [result.userFullName]: correctAnswers
                }))
            }))
        } catch (e) { }
    }, [request])

    const countCorrectAnswers = (result: Answer[]) => {
        count = 0;
        result.map((item: Answer) => {
            if (item.answer == 'true') {
                count = count + 1
            }
        })
        return count
    }

    useEffect(() => {
        resultHandler()
    }, [])

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Таблица результатов</h2>
            <Box
                display="flex"
                justifyContent="center">
                <TableContainer
                    component={Paper}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '600px'
                    }}
                >
                    <Table>
                        <TableHead sx={{ background: '#1565c0' }}>
                            <TableRow>
                                <TableCell sx={{ color: '#fafafa' }}> Имя пользователя </TableCell>
                                <TableCell sx={{ color: '#fafafa', alignItems: 'left' }}> Количество правильных ответов </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(result).map((item: any) => (
                                <TableRow>
                                    <TableCell>
                                        {item[0]}
                                    </TableCell>
                                    <TableCell>
                                        {item[1]}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
}
export default Results;