import { UserService } from '@meeco/sdk';
import { useEffect } from '@storybook/client-api';
import { getValue, setLoading, updateStatus } from './util';

const getUser = require('./get-user.html');

export default {
  title: 'User Fetching'
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

      try {
        const user = await userService.get(passphrase, secret);
        alert('User fetched successfully!');
      } catch (err) {
        // Todo, Your error handling
        alert(`Error: ` + err.message);
      } finally {
        setLoading(false);
      }
    });
  });

  return getUser;
};

(<any>UserFetching).story = {
  parameters: {
    notes: require('./user-fetching.md')
  }
};
