import React from 'react'
import CheckBox from './Checkbox'
import ComposantsCompTab from './ComposantsCompTab'
import ComposantsCompImbr from './ComposantsCompImbr'
import ComposantsCompSupEnfant from './ComposantsCompSupEnfant'

// 🐶 transforme 'CompoundComponentParent' en vrai composant composé
function CompoundComponentParent({ children }) {
  const [checked, setChecked] = React.useState(false)
  const tick = () => setChecked(!checked)

  // 🐶 remplace cela en clonant tous les enfants (children)
  // Pour parcourir tous les children utilise `React.Children.map`
  // Pour cloner utilise `React.cloneElement`
  // lors du clone passe les props 'checked' et 'tick'

  // Cloner les children en y injectant les props (checked et tick ici) et on les retournes
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { checked: checked, tick: tick })
  )
  // 📑 https://fr.reactjs.org/docs/react-api.html#reactchildren
  // 📑 https://fr.reactjs.org/docs/react-api.html#cloneelement
  // return <CheckBox checked={checked} onChange={tick} />
}

// 🐶 Accepte les props 'checked' et 'children'
function Accept({ checked, children }) {
  // 🐶 retourne le 'children' si 'checked' est à 'true', 'null' sinon
  if (checked) {
    return <>{children}</>
  }
  return null
}

// 🐶 Accepte les props 'checked' et 'children'
function Decline({ checked, children }) {
  // 🐶 retourne le 'children' si 'pas checked' est à 'true', 'null' sinon
  if (!checked) {
    return <>{children}</>
  }
  return null
}

// 🐶 Accepte les props 'checked' et 'tick' et ...props
function CheckBoxButton({ checked, tick, ...props }) {
  return <CheckBox checked={checked} onChange={tick} {...props} />
}

const ComposantsComposes = () => {
  return (
    <div>
      <h6>
        1- Dans cet exercice nous avons un composant CheckBox. On souhaite que
        ce composant soit composé (lié/couplé) à deux autres composants.'Accept'
        et 'Decline'. De tel maniere que l'affichage soit conditionner par la
        checkbox.
      </h6>
      <h6>------------------Compound Components pattern-------------------</h6>
      <div className="bg-[#29ce9a]">
        <CompoundComponentParent>
          <CheckBoxButton />
          <Accept>✅ J'accepte les termes du contrat</Accept>
          <Decline>❌ Je decline les termes du contrat</Decline>
        </CompoundComponentParent>
      </div>
      <h6>
        2- Dans cet exercice il va falloir faire un composant composé pour gérer
        également l'affichage d'autres composants liés à `TabsComponant`. Par
        exemple des formulaires d'inscription. Lorsqu'un qu'un onglet est
        sélectionné (_Par exemple paris_) , le composant Paris est affiché.
      </h6>
      <h6>------------------Avec un composant Tab-------------------</h6>
      <ComposantsCompTab />
      <h6>
        3- Dans l'exercice précédent `TabsComponant` n'utilisait pas le pattern
        "Composant composés". Nous allons donc créer un composant composés qui
        gère les `tabs` et un panel d'affichage dynamiquement. On reconnait donc
        ici une donc une imbrication de composants composés.
        <ul>
          <li>
            - `Tabs` : qui gère `TabList` et `TabPanels` (Tabs est un composant
            composé de 2 enfants)
          </li>
          <li>
            {' '}
            - `TabList` qui gère les composants `Tab` (TabList est un composant
            composé d'1 enfant)
          </li>
          <li>`TabPanels` qui gère les composants `Panel`</li> -
        </ul>
      </h6>
      <h6>------------------Composant Composés imbriqués-------------------</h6>
      <ComposantsCompImbr />
      <h6>
        4- On pourrait avoir envie d'avoir un enfant "autre" dans le composant
        composé.
      </h6>
      <h6>------------------Supporter un enfant "autre"-------------------</h6>
      <ComposantsCompSupEnfant />
    </div>
  )
}

export default ComposantsComposes
