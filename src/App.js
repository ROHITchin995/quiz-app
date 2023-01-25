import './App.css';
import { useGlobalContext } from './context';
import { Loading } from './Loading';
import { SetupForm } from './SetupForm';

function App() {
  // console.log(process.env.REACT_APP_API_URL)

  const {waiting, loading, questions, index, nextQuestion, checkAnswer, correct} = useGlobalContext()

  if(waiting){
    return <SetupForm />
  }
  if(loading){
    return <Loading />
  }
  
  const {question, incorrect_answers, correct_answer} = questions[index]
  let answers = [...incorrect_answers]
  const tempIndex = Math.floor(Math.random() * 4)
  if(tempIndex === 3){
    answers.push(correct_answer)
  }
  else{
    answers.push(answers[tempIndex])
    answers[tempIndex] = correct_answer
  }

  return (
    <main>
      <section className='quiz'>
        <p className='correct_answers'>
          correct answers : {correct}/ {index}
        </p>
        <article className='container'>
          {/* <h2 dangerouslySetInnerHTML={{ __html: question}}> */}
          <h2 dangerouslySetInnerHTML={{__html : question}} />
            <div className='button_container'>
              {answers.map((answer, index)=>{
                return (
                  <button key={index} className='answer_button'
                  dangerouslySetInnerHTML={{__html:answer}} 
                  onClick={()=> checkAnswer(correct_answer === answer)}/>
                )
              })}
            </div>
        </article>
        <button className='next_question' onClick={nextQuestion}>
          Next Question
        </button>
      </section>
    </main>
  );
}

export default App;
