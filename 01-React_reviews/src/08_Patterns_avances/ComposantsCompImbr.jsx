import React from 'react'
import './tab.css'

function Tabs({ children, ...props }) {
  const [selectedTabId, setSelectedTabId] = React.useState(0)
  const selectTab = (id) => setSelectedTabId(id)
  const clones = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      selectedTabId: selectedTabId,
      selectTab: selectTab,
      ...props,
    })
  )
  return (
    <div className="tabs" {...props}>
      {clones}
    </div>
  )
}

function TabList({ children, selectedTabId, selectTab, ...props }) {
  // Clone ici
  // Pour determiner le tabId utilise l"index de array children
  // 🤖
  // (child, tabId) =>

  const clones = React.Children.map(children, (child, tabId) =>
    React.cloneElement(child, {
      selectedTabId: selectedTabId,
      selectTab: selectTab,
      tabId: tabId,
      ...props,
    })
  )
  return (
    <div className="tab" {...props}>
      {clones}
    </div>
  )
}

function Tab({ selectedTabId, selectTab, tabId, children }) {
  return (
    <button
      key={children}
      className={selectedTabId === tabId ? 'tablinks active' : 'tablinks'}
      onClick={(e) => selectTab(tabId)}
    >
      {children}
    </button>
  )
}

function Panel({ selectedTabId, panelId, children, ...props }) {
  return selectedTabId === panelId ? <div {...props}>{children}</div> : null
}

function TabPanels({ selectedTabId, children }) {
  return React.Children.map(children, (child, panelId) =>
    // clones avec les props
    // selectedTabId
    // className: 'tabcontent',
    // panelId

    React.cloneElement(child, {
      selectedTabId: selectedTabId,
      className: 'tabcontent',
      panelId: panelId,
    })
  )
}

const ComposantsCompImbr = () => {
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Londre</Tab>
          <Tab>Paris</Tab>
          <Tab>Tokyo</Tab>
          <Tab>New York</Tab>
        </TabList>
        <TabPanels>
          <Panel>💷 Inscription pour aller à Londre</Panel>
          <Panel>🥖 Inscription pour aller à Paris</Panel>
          <Panel>🗻 Inscription pour aller à Tokyo</Panel>
          <Panel>🗽 Inscription pour aller à New York</Panel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default ComposantsCompImbr
