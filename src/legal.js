import '@fontsource-variable/inter';
import './styles/base.css';
import './styles/components.css';
import './styles/legal.css';

document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
