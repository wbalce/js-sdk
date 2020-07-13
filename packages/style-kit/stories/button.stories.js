export default { title: 'Button' };

import { story } from 'style-loader!./button.stories.scss';
import '../src/components/icons';

import { titleWords } from './helpers';

const meecoIcons = icon => `<meeco-icon icon=${icon}></meeco-icon>`;

export const catalog = () => {
  const container = document.createElement('div');
  container.className = story;

  const styles = ['primary', 'secondary', 'text'];
  const sizes = ['large', 'small'];
  styles.forEach(style => {
    sizes.forEach(size => {
      const button = document.createElement('button');
      button.className = `${style} ${size}`;
      button.innerHTML = titleWords(`${style} ${size}`);
      container.appendChild(button);
    });
  });

  const types = ['icon', 'icon-only'];
  types.forEach(type => {
    const iconButton = document.createElement('button');
    iconButton.className = `${type}`;
    iconButton.innerHTML =
      type === 'icon-only'
        ? meecoIcons('share')
        : `<span>${meecoIcons('share')}</span> text with icon `;
    container.appendChild(iconButton);
  });

  const disabledButtons = document.createElement('p');
  disabledButtons.innerHTML = 'Disabled:';
  container.appendChild(disabledButtons);

  styles.forEach(style => {
    sizes.forEach(size => {
      const button = document.createElement('button');
      button.className = `${style} ${size}`;
      button.innerHTML = titleWords(`${style} ${size}`);
      button.setAttribute('disabled', true);
      container.appendChild(button);
    });
  });

  return container;
};
