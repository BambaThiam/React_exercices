import { useState } from 'react'

function Challenge() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [password, setPassword] = useState('')

  const handleChangeMail = (event) => {
    // console.log(setEmail(event.target.value))
    // setError(email.includes('@') ? null : "L'email est incorrect")
    setMessage(
      event.target.value.includes('@') ? null : "L'email est incorrect"
    )
    setEmail(event.target.value)
  }
  const handleChangeName = (event) => {
    // console.log(setEmail(event.target.value))
    // setError(email.includes('@') ? null : "L'email est incorrect")
    // setMessage(
    //   event.target.value.includes('@') ? null : "L'email est incorrect"
    // )
    // setEmail(event.target.value)
    setName(event.target.value)
    // setPassword(event.target.value)
  }
  const handleChangePassword = (event) => {
    // console.log(setEmail(event.target.value))
    // setError(email.includes('@') ? null : "L'email est incorrect")
    // setMessage(
    //   event.target.value.includes('@') ? null : "L'email est incorrect"
    // )
    // setEmail(event.target.value)
    // setName(event.target.value)
    setPassword(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const message = alert(
      `Bonjour ${name} ton mail est : ${email} et ton mot de passe : ${password} `
    )
    return message
  }
  return (
    <div className="flex flex-col gap-4 m-10 text-center">
      <div className=" h-20 underline bg-amber-500 rounded-lg p-2 font-bold ">
        Header
      </div>
      <div className="h-auto bg-slate-300">
        <div className="flex flex-col gap-4 w-80 bg-red-50 m-auto h-full">
          <form
            className="flex flex-col p-4 gap-4 justify-center items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <img
                src="https://img.freepik.com/vecteurs-libre/vecteur-degrade-logo-colore-oiseau_343694-1365.jpg?w=996&t=st=1697371644~exp=1697372244~hmac=dd9950b023d36c4287ce5d823e473d793ae9c2bf73de1c2e531bf5d363cd9a3e"
                alt=""
                className="rounded-full w-16 m-auto"
              />
              <h3 className="text-3xl font-bold uppercase text-blue-500">
                contact us
              </h3>
              <h5 className="text-sm text-blue-600/50">
                Please fill this form to contact us
              </h5>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 ">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleChangeName}
                    placeholder="Name"
                    className="border-2 w-full"
                  />
                </div>
                <div className="flex flex-row gap-2 ">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleChangeMail}
                    placeholder="Email"
                    className="border-2 w-full"
                  />
                </div>
                <div className="flex flex-row gap-2 ">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handleChangePassword}
                    placeholder="Password"
                    className="border-2 w-full"
                  />
                </div>

                <div className="flex flex-row gap-2 ">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="border-2 w-full"
                  />
                </div>
                <div className="flex flex-col gap-2 ">
                  <textarea
                    name="message"
                    id="message"
                    value={message}
                    placeholder="Message"
                    className="border-2 w-full"
                  />
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="border-2 mb-4 rounded-lg bg-stone-300 cursor-pointer "
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className=" h-20 underline bg-amber-500 rounded-lg p-2 font-bold ">
        Footer
      </div>
    </div>
  )
}

export default Challenge
