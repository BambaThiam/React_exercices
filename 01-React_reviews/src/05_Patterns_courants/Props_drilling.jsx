export function Header({ siteName, nbMessages }) {
  return (
    <>
      <h1>Bienvenue sur {siteName} </h1>
      <Login siteName={siteName} />
      <MenuBarInfo nbMessages={nbMessages} />
    </>
  )
}

export function Login({ siteName }) {
  return <div>Connexion au site : {siteName} </div>
}

export function MenuBarInfo({ nbMessages }) {
  return <div>Vous avez {nbMessages} messages</div>
}
export function Content({ siteName }) {
  return <div>Article du site {siteName} </div>
}
export function Footer({ siteName, email }) {
  return (
    <>
      <CGV siteName={siteName} />
      <About siteName={siteName} email={email} />
    </>
  )
}
export function CGV({ siteName }) {
  return <div>CGV du site : {siteName} </div>
}
export function About({ siteName, email }) {
  return (
    <>
      <div>A propos du site : {siteName} </div>
      <div>Contactez nous : {email} </div>
    </>
  )
}
