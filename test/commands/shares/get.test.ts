import { expect } from '@oclif/test';
import { readFileSync } from 'fs';
import * as nock from 'nock';
import { customTest, outputFixture, testEnvironmentFile, testUserAuth } from '../../test-helpers';

describe('shares:get', () => {
  customTest
    .stdout()
    .stderr()
    .mockCryppo()
    .nock('https://api-sandbox.meeco.me', mockVault)
    .nock('https://keystore-sandbox.meeco.me', mockKeystore)
    .run(['shares:get', ...testUserAuth, ...testEnvironmentFile, 'share_1'])
    .it('lists the decrypted slots from a shared item', ctx => {
      const expected = readFileSync(outputFixture('get-shares.output.yaml'), 'utf-8');
      expect(ctx.stdout).to.contain(expected);
    });
});

function mockVault(api: nock.Scope) {
  api
    .get('/shares/share_1')
    .matchHeader('Authorization', '2FPN4n5T68xy78i6HHuQ')
    .reply(200, {
      shares: [
        {
          id: 'sh_1',
          connection_id: 'con_1',
          shareable_id: 'it_1',
          encryption_space_id: 'es_1'
        }
      ],
      items: [
        {
          id: 'it_1',
          label: 'My Cat',
          encrypted: true,
          slot_ids: ['sl_1', 'sl_2']
        }
      ],
      slots: [
        {
          id: 'sl_1',
          label: 'name',
          encrypted: true,
          encrypted_value: 'encrypted_fluffy'
        },
        {
          id: 'sl_2',
          label: 'age',
          encrypted: true,
          encrypted_value: 'encrypted_12'
        }
      ]
    });
}

function mockKeystore(api: nock.Scope) {
  api
    .get('/encryption_spaces/es_1')
    .matchHeader('Authorization', 'a2V5c3RvcmVfYXV0aF90b2tlbg==')
    .reply(200, {
      encryption_space_data_encryption_key: {
        serialized_data_encryption_key: 'secret_shared_key'
      }
    });
}