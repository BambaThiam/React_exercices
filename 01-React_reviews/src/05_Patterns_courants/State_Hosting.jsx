export function HeaderState({ todos }) {
  //   const [todos] = React.useState()
  // ... ici les todos pourraient être remplis via
  // des données venant d'api : fetchTodoAPI()
  return <div>Vous avez {todos.length} tâches </div>
}

export function TodoList({ todos }) {
  //   const [todos] = React.useState()
  // ... ici les todos pourraient etre remplis via
  // des données venant d'api : fetchTodoAPI()
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.name}</div>
      ))}
    </div>
  )
}
