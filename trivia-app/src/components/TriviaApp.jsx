import React, {useEffect, useState} from 'react'
import Question from './question'

const TriviaApp = () => {

    const [questions, setQuestions] = useState(null);

    useEffect(() => {

        const fetchQuestions = async () => {
            //https://the-trivia-api.com/v2/questions  
            const response = await fetch("https://opentdb.com/api.php?amount=5&tojken=5bb4dcc7fc2a3ed10ac626e73d9812f79b1b0b4dfdebe197767a98db3c8a2251");

            const data = await response.json();

            if(data.results) {
                setQuestions(data.results);
            }

        };

        fetchQuestions();
    }, []);

    return (
        <>
            <h1>Trivia App</h1>
            <hr></hr>

            {questions && questions.map((question, index) => (
                <Question question={question} />
            ))}
        </>
    );
};

export default TriviaApp;
