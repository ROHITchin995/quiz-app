import React, { useContext, useState } from "react"
import axios from "axios";
const table = {
    sports:21,
    history:23,
    politics: 24
}
const url = process.env.REACT_APP_API_URL;

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
            console.log(response)
        }
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        const { amount, category, difficulty} = quiz
        const url = `${url}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`
        fetchQuestions(url)
    }
    return(
        <AppContext.Provider value={{waiting, loading, error, handleSubmit}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = ()=>{
    return useContext(AppContext)
}

export {AppContext, AppProvider}
