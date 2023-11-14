import React from 'react'
import TabsComponent from './Tabs'
// import { default as TabsComponent } from './tab'
import './tab.css'

// 🐶 Même exercice que précédent mais avec un composant Tab
function CompoundComponentParent({ children }) {
  const [selectedTabId, setSelectedTabId] = React.useState(0)
  const selectTab = (id) => setSelectedTabId(id)

  // 🐶 remplace <TabsComponent> en clonant tous les enfants (children)
  // Pour parcourir tous les children utilise `React.Children.map`
  // Pour cloner utilise `React.cloneElement`
  // lors du clone passe les props 'selectedTabId' et 'selectTab'
  // 🤖

  return React.Children.map(children, (child) =>
    React.cloneElement(child, {
      selectedTabId: selectedTabId,
      selectTab: selectTab,
    })
  )

  // 📑 https://fr.reactjs.org/docs/react-api.html#reactchildren
  // 📑 https://fr.reactjs.org/docs/react-api.html#cloneelement
}

// 🐶 Accepte les props 'selectedTabId' et'children' pour les 3 composants London,Paris,Tokyo

function London({ selectedTabId, children }) {
  // 🐶 conditionne l'affichage de `<div>{children}</div>` si l'onglet selectionné est 'Londre'

  return selectedTabId === 0 ? <div>{children}</div> : null
}

function Paris({ selectedTabId, children }) {
  // 🐶 conditionne l'affichage de `<div>{children}</div>` si l'onglet selectionné est 'Paris'
  return selectedTabId === 1 ? <div>{children}</div> : null
}

function Tokyo({ selectedTabId, children }) {
  // 🐶 conditionne l'affichage de `<div>{children}</div>` si l'onglet selectionné est 'Tokyo'
  return selectedTabId === 2 ? <div>{children}</div> : null
}

// 🐶 Accepte les props 'selectedTabId' 'selectTab' 'tabs' et '...props'
function Tabs({ selectedTabId, selectTab, tabs, ...props }) {
  // 🐶 utilise <TabsComponent> avec ces 3 'props'
  return (
    <TabsComponent
      selected={selectedTabId}
      onChange={selectTab}
      tabs={tabs}
      {...props}
    />
  )
}

const ComposantsCompTab = () => {
  const options = [
    { title: 'London', display: 'London is the capital city of England.' },
    { title: 'Paris', display: 'Paris is the capital of France.' },
    { title: 'Tokyo', display: 'Tokyo is the capital of Japan.' },
  ]
  return (
    <div>
      <CompoundComponentParent>
        <Tabs tabs={options} />
        <London>💷 Inscription pour aller à Londre</London>
        <Paris>🥖 Inscription pour aller à Paris</Paris>
        <Tokyo>🗻 Inscription pour aller à Tokyo</Tokyo>
      </CompoundComponentParent>
    </div>
  )
}

export default ComposantsCompTab
