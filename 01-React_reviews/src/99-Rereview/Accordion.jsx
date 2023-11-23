import React from 'react'
import './data/accordion.css'

export const faqs = [
  {
    title: 'Where are these chairs assembled?',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.',
  },
  {
    title: 'How long do I have to return my chair?',
    text: 'Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.',
  },
  {
    title: 'Do you ship to countries outside the EU?',
    text: 'Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!',
  },
]

const AccordionItem = ({ num, title, text }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div
      className={`item ${isOpen ? 'open' : ''}`}
      onClick={() => setIsOpen((isOpen) => !isOpen)}
    >
      <p className="number">{num <= 9 ? `0${num}` : num}</p>
      <p className={isOpen ? 'title' : ''}>{title}</p>
      <p className="icon">{isOpen ? '-' : '+'}</p>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  )
}

const Accordion = ({ data }) => {
  return (
    <div className="accordion  ">
      {data.map((el, index) => (
        <AccordionItem
          key={index}
          num={index + 1}
          title={el.title}
          text={el.text}
        />
      ))}
    </div>
  )
}

export default Accordion
