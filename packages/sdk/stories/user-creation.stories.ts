import { SecretService, UserService } from '@meeco/sdk';
import { useEffect } from '@storybook/client-api';
import { getValue, setLoading, setValue, updateStatus } from './util';

const createUser = require('./create-user.html');
const getUser = require('./get-user.html');

export default {
  title: 'User Creation'
};

export const UserCreation = () => {
  useEffect(() => {
    document.getElementById('create')?.addEventListener('click', async () => {
      const passphrase = getValue('passphrase');
      if (!passphrase) {
        alert('Please enter passphrase');
        return;
      }

      setLoading(true);

      const userService = new UserService(
        {
          keystore: {
            url: '',
            subscription_key: ''
          },
          vault: {
            url: '',
            subscription_key: ''
          }
        },
        updateStatus
      );

      const secretService = new SecretService();

      try {
        const username = await userService.generateUsername();
        const secret = await secretService.generateSecret(username);
        const user = await userService.create(passphrase, secret);
        setValue('secret', secret);
      } catch (err) {
        // Todo, Your error handling
        alert(`Error: ` + err.message);
      } finally {
        setLoading(false);
      }
    });
  });

  return createUser;
};

(<any>UserCreation).story = {
  parameters: {
    notes: require('./user-creation.md')
  }
};
