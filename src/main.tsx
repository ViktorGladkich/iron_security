import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/*
 * Лендинг с вступительной анимацией и лениво монтируемыми секциями.
 * Восстановленная браузером позиция прокрутки означает, что скролл-триггеры
 * секции родятся сразу в середине своего диапазона: анимация текста окажется
 * доигранной ещё до того, как пользователь её увидит. Стартуем сверху.
 */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
