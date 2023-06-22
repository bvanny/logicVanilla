import styles from './Home.module.css';
import Quiz from '../assets/quiz.mp4';
import Memory from '../assets/memory.mp4';
import { VideoPreview } from '../Components/VideoPreview/VideoPreview';

export const Home = () => {
  return (
    <div className={styles.home}>
      <section>
        <div className={styles.containerVideo}>
          <VideoPreview 
            src={Quiz} 
            to="/quiz" 
            buttonText="Entrar no jogo" 
            textVideo="O jogo Quiz de React e JavaScript é um desafio interativo que testa seus conhecimentos sobre os conceitos e recursos dessas duas tecnologias amplamente utilizadas no desenvolvimento web."
          />
        </div>
        <div className={styles.containerVideo}>
          <VideoPreview 
            src={Memory} 
            to="/memory" 
            buttonText="Entrar no jogo" 
            textVideo="O tabuleiro do jogo é composto por várias cartas viradas para baixo. Cada carta possui um par correspondente, formando um total de pares no jogo. Seu objetivo é encontrar todos os pares de cartas correspondentes, revelando duas cartas por vez e tentando combiná-las."
          />
        </div>
      </section>
    </div>
  );
};
