import React, { useEffect, useState } from "react";
import { Radio } from "../../Quiz/Radio";
import { Link } from "react-router-dom";

const perguntas = [
  {
    pergunta: 'Qual método é utilizado para criar componentes?',
    options: [
      'React.makeComponent()',
      'React.createComponent()',
      'React.createElement()',
    ],
    resposta: 'React.createElement()',
  },
  {
    pergunta: 'O que é React?',
    options: [
      'Uma biblioteca para construir interfaces de usuário',
      'Um framework para desenvolvimento backend',
      'Um banco de dados relacional',
    ],
    resposta: 'Uma biblioteca para construir interfaces de usuário',
  },
  {
    pergunta: 'Qual a versão atual do React?',
    options: ['React 15', 'React 16', 'React 17'],
    resposta: 'React 17',
  },
  {
    pergunta: 'O que é JSX?',
    options: [
      'Uma linguagem de programação baseada em JavaScript',
      'Uma extensão de sintaxe para JavaScript usada com o React',
      'Uma biblioteca para manipulação de DOM',
    ],
    resposta: 'Uma extensão de sintaxe para JavaScript usada com o React',
  },
  {
    pergunta: 'Qual o hook do React usado para manipular o ciclo de vida do componente?',
    options: ['useEffect()', 'useState()', 'useContext()'],
    resposta: 'useEffect()',
  },
  {
    pergunta: 'O que é um componente controlado?',
    options: [
      'Um componente que possui seu estado gerenciado pelo React',
      'Um componente que não possui renderização visual',
      'Um componente que usa classes em vez de funções',
    ],
    resposta: 'Um componente que possui seu estado gerenciado pelo React',
  },
  {
    pergunta: 'Qual a finalidade do ReactDOM?',
    options: [
      'Renderizar elementos React em um portal separado do DOM',
      'Manipular o estado do componente',
      'Criar componentes React',
    ],
    resposta: 'Renderizar elementos React em um portal separado do DOM',
  },
  {
    pergunta: 'Qual é a função do método `render()` em um componente React?',
    options: [
      'Retornar a estrutura JSX do componente',
      'Executar lógica assíncrona',
      'Manipular o estado do componente',
    ],
    resposta: 'Retornar a estrutura JSX do componente',
  },
  {
    pergunta: 'O que é o Virtual DOM?',
    options: [
      'Uma versão emulada do DOM usada pelo React para otimizar a renderização',
      'Um recurso que permite criar componentes visuais personalizados',
      'Uma técnica para manipular o DOM diretamente',
    ],
    resposta: 'Uma versão emulada do DOM usada pelo React para otimizar a renderização',
  },
  {
    pergunta: 'Qual é a diferença entre state e props no React?',
    options: [
      'State é imutável e props é mutável',
      'Props é usado para armazenar dados locais e state é usado para dados globais',
      'State é gerenciado internamente pelo React e props são passados para um componente',
    ],
    resposta: 'State é gerenciado internamente pelo React e props são passados para um componente',
  },
  {
    pergunta: 'Qual método é usado para atualizar o estado de um componente?',
    options: [
      'setState()',
      'updateState()',
      'changeState()',
    ],
    resposta: 'setState()',
  },
  {
    pergunta: 'O que é uma arrow function?',
    options: [
      'Uma função que usa a sintaxe `=>` para definir a função',
      'Uma função que não aceita parâmetros',
      'Uma função que retorna um valor booleano',
    ],
    resposta: 'Uma função que usa a sintaxe `=>` para definir a função',
  },
  {
    pergunta: 'O que é um closure?',
    options: [
      'Um escopo que armazena variáveis para acesso posterior',
      'Uma função que não possui corpo',
      'Uma função que recebe outra função como parâmetro',
    ],
    resposta: 'Um escopo que armazena variáveis para acesso posterior',
  },
  {
    pergunta: 'Qual é a diferença entre `null` e `undefined` em JavaScript?',
    options: [
      '`null` indica ausência intencional de valor, enquanto `undefined` indica ausência de valor atribuído',
      '`null` é usado para indicar um erro, enquanto `undefined` indica um valor vazio',
      '`null` é usado para definir variáveis, enquanto `undefined` é usado para definir funções',
    ],
    resposta: '`null` indica ausência intencional de valor, enquanto `undefined` indica ausência de valor atribuído',
  },
  {
    pergunta: 'O que é o operador `typeof`?',
    options: [
      'Um operador que retorna o tipo de uma variável',
      'Um operador usado para concatenar strings',
      'Um operador usado para comparar valores',
    ],
    resposta: 'Um operador que retorna o tipo de uma variável',
  },
  {
    pergunta: 'O que é hoisting em JavaScript?',
    options: [
      'O comportamento de mover declarações para o topo do escopo',
      'O processo de criar um novo escopo para variáveis',
      'A ação de copiar valores de uma variável para outra',
    ],
    resposta: 'O comportamento de mover declarações para o topo do escopo',
  },
  {
    pergunta: 'Qual método é usado para converter um valor para um número inteiro em JavaScript?',
    options: [
      'parseInt()',
      'parseFloat()',
      'Number()',
    ],
    resposta: 'parseInt()',
  },
  {
    pergunta: 'O que é uma promessa (Promise) em JavaScript?',
    options: [
      'Um objeto que representa um valor que pode estar disponível agora, no futuro ou nunca',
      'Um objeto usado para armazenar dados em cache',
      'Um objeto usado para definir loops em JavaScript',
    ],
    resposta: 'Um objeto que representa um valor que pode estar disponível agora, no futuro ou nunca',
  },
  {
    pergunta: 'O que é o JSON?',
    options: [
      'Um formato de dados baseado em texto para representar objetos e arrays',
      'Um tipo de dado numérico em JavaScript',
      'Uma biblioteca para manipulação de DOM',
    ],
    resposta: 'Um formato de dados baseado em texto para representar objetos e arrays',
  },
];


export const Form = () => {
  const [responses, setResponses] = useState({});
  const [slide, setSlide] = useState(0);
  const [result, setResult] = useState(null);
  const [restartAnimation, setRestartAnimation] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (restartAnimation) {
      const timer = setTimeout(() => {
        setRestartAnimation(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [restartAnimation]);

  useEffect(() => {
    const initialResponses = perguntas.reduce((acc, pergunta, index) => {
      acc[index] = "";
      return acc;
    }, {});
    setResponses(initialResponses);
  }, []);

  function handleChange({ target }) {
    setResponses({ ...responses, [slide]: target.value });
    setError(false);
  }

  function finalResult() {
    const corrects = perguntas.filter(
      (pergunta, index) => responses[index] === pergunta.resposta
    );
    setResult(`Você acertou: ${corrects.length} de ${perguntas.length}`);
  }

  function handleSlideClick() {
    if (slide < perguntas.length - 1) {
      if (responses[slide] !== "") {
        setSlide(slide + 1);
      } else {
        setError(true);
      }
    } else {
      setSlide(slide + 1);
      finalResult();
    }
  }

  function handleRestart() {
    const initialResponses = perguntas.reduce((acc, pergunta, index) => {
      acc[index] = "";
      return acc;
    }, {});
    setResponses(initialResponses);
    setSlide(0);
    setResult(null);
    setRestartAnimation(true);
  }

  return (
    <main>
      <div className={`container ${restartAnimation ? 'animFormRestart' : 'animForm'}`}>
        <form onSubmit={(event) => event.preventDefault()}>
          {perguntas.map((pergunta, index) => (
            <Radio
              active={slide === index}
              key={index}
              onChange={handleChange}
              value={responses[index]}
              {...pergunta}
            />
          ))}
        </form>
        {result ? (
          <div className="animResult containerResult">
            <p className="result">{result}</p>
            <div className="containerButtons">
              <button onClick={handleRestart}>Reiniciar</button>
            </div>
          </div>
        ) : (
          <div className="errorDiv">
            {error && <p className="errorText">Por favor, selecione uma resposta!</p>}
            {
              error 
              ? ''
              : <button onClick={handleSlideClick}>Próxima</button>
            }
          </div>
        )}
      </div>
    </main>
  );
};