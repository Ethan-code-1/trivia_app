import React, {useEffect, useState} from 'react'

const Question = ({ question }) => {

    const answerChoices = [...question.incorrect_answersm, question.correct_answer]

    return (
        <>
            <h3>{question.question}</h3>

                {question.incorrect_answers.map((answer, index) => (
                   <div>
                    <button>{answer}</button>
                    </div>
                ))}
                
            
        </>

    )

}

export default Question;
