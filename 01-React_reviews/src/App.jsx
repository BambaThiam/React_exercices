import React from 'react'
import { MesSkills, MesSkills1, MesSkills2 } from './01_Rendu_tableau/Rendu_tab'
import { LoginForm } from './03_Formulaires/09'
import Challenge from './04_Challenge/Challenge'
import { Calcul } from './05_Patterns_courants/Props_Functions_components'
import { Content, Footer, Header } from './05_Patterns_courants/Props_drilling'
import { HeaderState, TodoList } from './05_Patterns_courants/State_Hosting'
import { fetchTodoAPI } from './05_Patterns_courants/data'
import {
  FirstNameInput,
  NameInput,
} from './05_Patterns_courants/Lifting_State_Up'

function App() {
  // Pour props drilling
  const siteName = 'bamba.com'
  const email = 'contact@bamba.com'
  const nbMessages = 18
  // end
  // Pour State Hoisting
  const todosFromAPI = fetchTodoAPI()
  const [todos] = React.useState(todosFromAPI)
  // end
  // Pour Lifing State Up

  const [name, setName] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const handleChangeName = (name) => {
    setName(name)
  }
  const handleChangeFirstName = (firstName) => {
    setFirstName(firstName)
  }

  // end
  return (
    <>
      <div>
        <h1 className="text-9xl font-bold">React Tuto</h1>
      </div>
      <div className="m-10 flex flex-col gap-10 border-2 m-4 p-4">
        <h3 className="text-3xl m-4 underline decoration-sky-500 ">
          React Reviews
        </h3>
        <div className="flex flex-col gap-4">
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Props & component
          </h4>
          <div className="flex flex-row gap-4">
            <MesSkills />
            <MesSkills1 />
            <MesSkills2 />
          </div>
        </div>
        <div>
          <h4 className=" underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Forms
          </h4>
          <LoginForm />
        </div>
        <div>
          <h4 className=" underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Challenge fin de module fondamentaux
          </h4>
          <Challenge />
        </div>
        <div>
          <h4 className=" underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Props functions
          </h4>

          <input
            type="button"
            className="border-2 m-4 rounded-lg bg-stone-300 cursor-pointer "
            value={'Calculer'}
            // onClick={handleClick}
          />
          <Calcul nb1={5} nb2={6} operation={'+'} />
          <h6>-------------------------</h6>
          <Calcul nb1={5} nb2={6} operation={'-'} />
          <h6>-------------------------</h6>
          <Calcul nb1={5} nb2={6} operation={'*'} />
          <h6>-------------------------</h6>
          <Calcul nb1={5} nb2={6} operation={'/'} />
        </div>
        <div>
          <h4 className=" underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Props Drilling
          </h4>
          <div>
            <Header siteName={siteName} nbMessages={nbMessages} />
            <Content siteName={siteName} />
            <Footer siteName={siteName} email={email} />
          </div>
        </div>
        <div>
          <h4 className=" underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            State Hoisting
          </h4>
          <div>
            <HeaderState todos={todos} />
            <TodoList todos={todos} />
          </div>
        </div>
        <div>
          <h4 className=" underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Lifting Stat Up
          </h4>
          <div>
            {/* 🐶 Passe les bons props (fonctions et données)  */}
            <NameInput onNameChange={handleChangeName} name={name} />
            <FirstNameInput
              onFirstNameChange={handleChangeFirstName}
              firstName={firstName}
            />
            <div>
              Bonjour {name} {firstName}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
