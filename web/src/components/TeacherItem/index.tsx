import React from 'react'

import './styles.css'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

function TeacherItem(){
  return (
      <article className="teacher-item">
        <header>
          <img src="https://avatars0.githubusercontent.com/u/59318627?s=460&v=4" alt="Avatar" />
          <div>
            <strong>Vinicius</strong>
            <span>Química</span>
          </div>
        </header>

      <p>
        Entusiasta das melhores tecnologias de química avançada.
        <br/>
        <br/>
        Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma de minhas explosões.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  )
}

export default TeacherItem
