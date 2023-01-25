import React, { useContext, useState } from "react"
import axios from "axios";
const table = {
    sports:21,
    history:23,
    politics: 24
}
const app_url = process.env.REACT_APP_API_URL;

const AppContext = React.createContext()
const AppProvider = ({children}) =>{
    const [waiting, setWating] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [questions, setQuestions] = useState([])
    const [index, setIndex] = useState(0)
    const [correct, setCorrect] = useState(0)
    const [quiz, setQuiz] = useState({
        amount: 10,
        category: 'sports',
        difficulty: 'easy'
    })

    const [isModalOpen, setIsModalOpen] = useState(false)

    const fetchQuestions = async (url) =>{
        setLoading(true)
        setWating(false)
        const response = await axios(url).catch((err)=> console.log(err))
        if(response){
            const data = response.data.results
            if(data.length > 0){
                setQuestions(data)
                setLoading(false)
                setWating(false)
                setError(false)
            } else{
                setWating(true)
                setError(true)
            }
            console.log(data)
        }
        else{
            setWating(true)
        }
       
    }
    const nextQuestion = ()=>{
        setIndex((oldIndex)=>{
            const index = oldIndex + 1
            if(index > questions.length - 1){
                return <h1>questions ended</h1>
            }
            else{
                return index
            }
        })
    }
    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setQuiz({...quiz, [name]:value})
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        const { amount, category, difficulty} = quiz
        const url = `${app_url}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`
        console.log(url)
        fetchQuestions(url)
    }
    const checkAnswer = (value)=>{
        if(value){
            setCorrect((oldState)=> oldState + 1)
        }
        nextQuestion()
    }
    return(
        <AppContext.Provider value={{waiting, loading, error, handleSubmit, handleChange, 
        quiz, questions, index, nextQuestion, checkAnswer, correct}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = ()=>{
    return useContext(AppContext)
}

export {AppContext, AppProvider}
