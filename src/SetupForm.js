import React from 'react'
import { useGlobalContext } from './context'


export const SetupForm = () => {
 const {error, handleSubmit} = useGlobalContext()
  return (
    <main>
        <section className='quiz quiz_small'>
            <form className='setup_form' >
                <h2>Setup Quiz</h2>
                <div className='form_control'>
                    {/* Number of questions */}
                    <label htmlFor="amount">Number of questions</label>
                    <input type="number" name="amount" id="amount" />                    
                </div>
                {/* Category */}
                <div className='form_control'>
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category">
                        <option value="sports">sports</option>
                        <option value="history">history</option>
                        <option value="politics">politics</option>
                    </select>
                </div>
                <div className='form_control'>
                {/* Difficulty */}
                <label htmlFor="difficulty">Select difficulty</label>
                <select name="difficulty" id="difficulty">
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                </select>
                </div>
                {error && (
                    <p className='error'>
                        Can't generate questions, please try different options
                    </p>
                )}
                <button type='submit' className='submit_button'>
                    Start
                </button>
            </form>
        </section>
    </main>
  )
}
