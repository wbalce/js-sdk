export default {
  title: 'Button'
};

import { story } from 'style-loader!./button.stories.scss';

export const catalog = () => {
  const container = document.createElement('div');
  container.className = story;

  container.innerHTML =
    /* html*/

    `<button class="primary large">Primary Large</button>
     <button class="primary small">Primary Small</button>

     <button class="secondary large">Secondary Large</button>
     <button class="secondary small">Secondary small</button>

     <button class="text large">Text large</button>
     <button class="text small">Text small</button>

     <button class="text large"><i>share</i>text with icon</button>
     <button class="icon-only"><i>add</i></button>`;

  return container;
};
