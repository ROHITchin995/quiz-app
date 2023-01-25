import './App.css';
import { useGlobalContext } from './context';
import { SetupForm } from './SetupForm';

function App() {
  // console.log(process.env.REACT_APP_API_URL)

  const {waiting, loading} = useGlobalContext()

  if(waiting){
    return <SetupForm />
  }
  if(loading){
    return <>Loading</>
  }


  return (
    <main>
      <section className='quiz'>
        <p className='correct_answers'>
          correct answers : 
        </p>
        <article className='container'>
          <h2>
            <div className='button_container'>

            </div>
          </h2>
        </article>
        <button className='next_question'>
          Next Question
        </button>
      </section>
    </main>
  );
}

export default App;
