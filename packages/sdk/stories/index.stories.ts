import { SecretService, UserService } from '@meeco/sdk';
import { useEffect } from '@storybook/client-api';

const createUser = require('./create-user.html');
const getUser = require('./get-user.html');

export default {
  title: 'User Creation'
};

const userService = new UserService({
  keystore: {
    url: '',
    subscription_key: ''
  },
  vault: {
    url: '',
    subscription_key: ''
  }
});

const secretService = new SecretService();

const getValue = id => (<HTMLInputElement>document.getElementById(id))!.value;
const setValue = (id, value) => ((<HTMLInputElement>document.getElementById(id))!.value = value);

export const UserCreation = () => {
  useEffect(() => {
    document.getElementById('create')?.addEventListener('click', async () => {
      const passphrase = getValue('passphrase');
      if (!passphrase) {
        alert('Please enter passphrase');
        return;
      }

      document.getElementById('create')?.setAttribute('disabled', 'true');

      try {
        const username = await userService.generateUsername();
        const secret = await secretService.generateSecret(username);
        const user = await userService.create(passphrase, secret);
        setValue('secret', secret);
      } catch (err) {
        // Todo, Your error handling
        alert(`Error: ` + err.message);
      } finally {
        document.getElementById('create')?.removeAttribute('disabled');
      }
    });
  });

  return createUser;
};

(<any>UserCreation).story = {
  parameters: {
    notes: `
## Creating a Meeco User    
`
  }
};

export const UserFetching = () => {
  useEffect(() => {
    document.getElementById('fetch')?.addEventListener('click', async () => {
      const passphrase = getValue('passphrase');
      const secret = getValue('secret');
      if (!passphrase || !secret) {
        alert('Please enter passphrase and secret');
        return;
      }

      document.getElementById('fetch')?.setAttribute('disabled', 'true');

      try {
        const user = await userService.get(passphrase, secret);
        alert('User fetched successfully!');
      } catch (err) {
        // Todo, Your error handling
        alert(`Error: ` + err.message);
      } finally {
        document.getElementById('fetch')?.removeAttribute('disabled');
      }
    });
  });

  return getUser;
};

(<any>UserFetching).story = {
  parameters: {
    notes: `
## Fetching a Meeco User    
`
  }
};
