import React, {useEffect, useState} from 'react'
import '../answerChoice.css'
import he from 'he';
import ButtonGroup from '@mui/material/ButtonGroup';

const Question = ({ question }) => {

    //State variables to keep track of index of button that was last clicked, last clicked correct and wrong solutions are saved 
    const [clickedWrong, setClickedWrong] = useState(null);
    const [clickedRight, setClickedRight] = useState(null);

    //Additional last index clicked utalized to deactivate old button after a new click
    const [lastClickedIndex, setLastClickedIndex] = useState(null);

    //Used to store the answer associated with the question, only constructed upon component creation
    const [answers, setAnswers] = useState([]);

    //State variable that stores if the question has been correctly guessed, essentially locks the question from further clicks if so
    const [isCorrect, setIsCorrect] = useState(false);

    //State to determine if the question component has been rendered before 
    const [renderedBefore, setRenderedBefore] = useState(false);

    //Old test answers arr
    //const answers = [...question.incorrect_answers, question.correct_answer];

    //Randomizing questions only first time question is rendered to prevent questions from reordering on clicks 
    useEffect(() => {
        if(!renderedBefore){
            let answersArr = [...question.incorrect_answers, question.correct_answer]

            //Random sorting of array: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
            setAnswers((answersArr.sort(() => .5 - Math.random() )));

            setRenderedBefore(true);
        }
    }, [renderedBefore, question]);


    //method to handle click events that are incorrect
    const handleWrongClick = (key) => {
        //Check that the correct answer has not yet been guessed: 
        if(!isCorrect){
            setClickedWrong(key);

            //Store the index of the component that was last clicked wrong
            setLastClickedIndex(key); 
        }
    }

    //Method for handling correct guesses
    const handleRightClick = (key) => {
        //Effectively sets that question component to have a state saying it was wrongly clicked
        setClickedRight(key);

        //Want to remove the red highlighting of last guess if last guess was wrong as this event will not retrigger it
        setClickedWrong(null)

        //Want to also make it impossible to click
        setIsCorrect(true); 

    }

    return (
        <>
            <h3>{he.decode(question.question)}</h3>

            <ButtonGroup variant="outlined" aria-label="Basic button group">


            {answers.map((answer, index) => (
                //Will use key to keep track of buttons, when a button is wrong the key will be used to identify it as wrong and then set class accordingly
                <div key = {index}>

                    {answer == question.correct_answer ? (
                        //Answer choice is correct, render the button with the correct event listener
                        <button className = {clickedRight === index ? 'rightChoice' : ""} onClick={ () => handleRightClick(index)}>{he.decode(answer)}</button>
                    ) : (
                        //Answer choice is wrong, render the button with the incorrect event listener 
                        <button className = {clickedWrong === index ? 'wrongChoice' : ""} onClick={ () => handleWrongClick(index)}>{he.decode(answer)}</button>
                    )}
                </div>
))} 
</ButtonGroup>
        </>

    )

}

export default Question;