import React from 'react';
import QuantumCube from './components/QuantumCube';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <QuantumCube />
      <div className="description-container-wrapper">
        <h2 className="description-title">Simulação de Flutuação Quântica de Vácuo</h2>
        <div className="description-container">
          <button className="more-button" onClick={() => {
            const moreInfo = document.querySelector('.more-info');
            if (moreInfo) {
              moreInfo.classList.toggle('visible');
            }
          }}>
            <span className="arrow"></span>
            Saiba mais
          </button>
          <div className="more-info">
            <p>
              Esta simulação visualiza o conceito de flutuações quânticas de vácuo. Em um espaço vazio, a energia não é
              constante, mas apresenta variações súbitas e temporárias devido a princípios da mecânica quântica. 
              Essas flutuações são representadas aqui por partículas que se movem de forma aleatória e mudam de cor para
              simular o efeito de calor.
            </p>
            <p>
              As partículas azuis representam a energia em estado normal, enquanto as áreas que se tornam vermelhas
              representam o aumento temporário de energia devido às flutuações. Este comportamento é fundamental na
              mecânica quântica e mostra que mesmo no vácuo, a energia não é zero.
            </p>
            <h3>Conceito de Flutuação Quântica de Vácuo</h3>
            <p>
              As flutuações quânticas de vácuo são um fenômeno previsto pela teoria quântica de campos, que descreve o
              comportamento das partículas subatômicas. Segundo essa teoria, o vácuo quântico não é realmente vazio, mas sim
              um estado dinâmico onde partículas virtuais estão constantemente sendo criadas e aniquiladas. Essas partículas
              virtuais aparecem e desaparecem tão rapidamente que não podem ser diretamente observadas, mas seus efeitos
              podem ser sentidos, como no efeito Casimir.
            </p>
            <p>
              A energia dessas flutuações pode causar mudanças temporárias na quantidade de energia em um ponto específico
              do espaço, o que é representado na simulação pelo movimento e mudança de cor das partículas. Essa energia
              "emprestada" do vácuo quântico retorna ao vácuo após um curto período de tempo, mantendo o equilíbrio de
              energia no universo.
            </p>
            <h3>Movimento e Energia na Simulação</h3>
            <p>
              Na simulação, cada partícula representa uma região do espaço onde ocorrem flutuações quânticas. As partículas 
              se movem de forma aleatória para simular a incerteza quântica, uma característica fundamental da mecânica quântica. 
              Este movimento aleatório reflete a natureza imprevisível das flutuações de energia no vácuo.
            </p>
            <p>
              A cor das partículas varia do azul ao vermelho, representando diferentes níveis de energia. Quando uma partícula 
              se torna vermelha, isso indica um aumento temporário de energia nessa região específica do espaço. Este aumento é 
              causado por uma flutuação quântica, onde a energia do vácuo "empresta" energia para a criação de partículas virtuais.
            </p>
            <p>
              O índice de energia e o movimento exibidos para cada partícula na simulação fornecem uma representação visual 
              dessas flutuações. O índice de energia é uma medida da intensidade da flutuação em um determinado ponto, enquanto 
              o movimento reflete a alteração de posição das partículas devido às variações de energia.
            </p>
            <p>
              Esta visualização ajuda a ilustrar como, mesmo no aparente vazio do espaço, há uma atividade constante e dinâmica 
              a nível quântico. Isso destaca a natureza fundamentalmente não estática do vácuo quântico, onde as flutuações de energia 
              desempenham um papel crucial.
            </p>
            <p>
              A teoria das flutuações quânticas de vácuo tem implicações profundas na física moderna, incluindo a compreensão da
              energia escura e da estrutura do universo em larga escala.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
