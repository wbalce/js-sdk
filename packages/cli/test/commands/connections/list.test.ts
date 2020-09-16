import { ConnectionService } from '@meeco/sdk';
import { expect } from '@oclif/test';
import { readFileSync } from 'fs';
import {
  customTest,
  outputFixture,
  testEnvironmentFile,
  testGetAll,
  testUserAuth,
} from '../../test-helpers';

describe('connections:list', () => {
  customTest
    .stdout()
    .stub(ConnectionService.prototype, 'listConnections', listConnections as any)
    .run(['connections:list', ...testUserAuth, ...testEnvironmentFile])
    .it('lists a users connections', ctx => {
      const expected = readFileSync(outputFixture('list-connections.output.yaml'), 'utf-8');
      expect(ctx.stdout).to.contain(expected.trim());
    });

  customTest
    .stdout()
    .stub(ConnectionService.prototype, 'listAll', listConnections as any)
    .run(['connections:list', ...testUserAuth, ...testEnvironmentFile, ...testGetAll])
    .it('lists all users connections when paginated', ctx => {
      const expected = readFileSync(outputFixture('list-connections.output.yaml'), 'utf-8');
      expect(ctx.stdout).to.contain(expected.trim());
    });
});

const connections = [
  {
    name: 'Some Encrypted Name[decrypted with my_generated_dek]',
    connection: {
      own: {
        id: 'abc123',
        encrypted_recipient_name: 'Some Encrypted Name',
        integration_data: null,
        connection_type: null,
        user_image: null,
        user_type: null,
        user_public_key: null,
        user_keypair_external_id: null,
      },
      the_other_user: {
        id: 'abc345',
        connection_type: null,
        user_id: null,
        user_image: null,
        user_type: null,
        user_public_key: null,
        user_keypair_external_id: null,
      },
    },
  },
  {
    name: 'Some Encrypted Name[decrypted with my_generated_dek]',
    connection: {
      own: {
        id: 'def456',
        encrypted_recipient_name: 'Some Encrypted Name',
        integration_data: null,
        connection_type: null,
        user_image: null,
        user_type: null,
        user_public_key: null,
        user_keypair_external_id: null,
      },
      the_other_user: {
        id: 'def789',
        connection_type: null,
        user_id: null,
        user_image: null,
        user_type: null,
        user_public_key: null,
        user_keypair_external_id: null,
      },
    },
  },
];

function listConnections(authConfig) {
  return Promise.resolve(connections);
}
