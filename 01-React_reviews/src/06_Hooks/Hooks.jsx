import { EmojiSearch } from './EmojiApp/EmojiApp'
import { LiftingState } from './LiftingState'
import { Depend_Props, LoginUseEffet } from './UseEffect'
import UseEffetHTTP1 from './UseEffetHTTP1'
import UseEffetHTTP2 from './UseEffetHTTP2'
import { LoginState, LoginStateProps, LoginStatePropsCheck } from './UseState'

const Hooks = () => {
  return (
    <>
      <div className="m-10 flex flex-col gap-10 border-2 m-4 p-4">
        <h3 className="text-3xl m-4 underline decoration-sky-500 ">
          Les Hooks
        </h3>
        <div className="flex flex-col gap-4">
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            UseState
          </h4>
          <LoginState />
          <LoginStateProps />
          <LoginStateProps initialEmail="contact@bamba.com" />
          <LoginStatePropsCheck initialEmail="contact@bamba.com" />
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            UseEffet
          </h4>
          <LoginUseEffet initialEmail="contact@bamba.com" />
          <Depend_Props />
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Lifting State
          </h4>
          <LiftingState />
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Mini appli EmojiList
          </h4>
          <EmojiSearch />
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            useEffet : appels HTTP simples
          </h4>
          <UseEffetHTTP1 />
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            useEffet : appels HTTP avancées
          </h4>
          <UseEffetHTTP2 />
        </div>
      </div>
    </>
  )
}

export default Hooks
