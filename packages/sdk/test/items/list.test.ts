import { expect } from '@oclif/test';
import { ItemService } from '../../src/services/item-service';
import {
  customTest,
  environment,
  getOutputFixture,
  MOCK_NEXT_PAGE_AFTER,
  testUserAuth,
} from '../test-helpers';

describe('Items list', () => {
  customTest
    .nock('https://sandbox.meeco.me/vault', api =>
      api
        .get('/items')
        .matchHeader('Authorization', '2FPN4n5T68xy78i6HHuQ')
        .matchHeader('Meeco-Subscription-Key', 'environment_subscription_key')
        .reply(200, response)
    )
    .it('list items that the user has', async () => {
      const result = await new ItemService(environment).list(testUserAuth.vault_access_token);

      const expected = getOutputFixture('list-items.output.yaml');
      expect(result.items).to.deep.members(expected.spec);
    });
});

describe('Items listAll', () => {
  customTest
    .nock('https://sandbox.meeco.me/vault', api =>
      api
        .get('/items')
        .matchHeader('Authorization', '2FPN4n5T68xy78i6HHuQ')
        .matchHeader('Meeco-Subscription-Key', 'environment_subscription_key')
        .reply(200, responsePart1)
        .get('/items')
        .query({ next_page_after: MOCK_NEXT_PAGE_AFTER })
        .matchHeader('Authorization', '2FPN4n5T68xy78i6HHuQ')
        .matchHeader('Meeco-Subscription-Key', 'environment_subscription_key')
        .reply(200, responsePart2)
    )
    .it('lists all items that the user has when paginated', async () => {
      const result = await new ItemService(environment).listAll(testUserAuth.vault_access_token);

      const expected = getOutputFixture('list-items.output.yaml');
      expect(result.items).to.deep.members(expected.spec);
    });
});

const response = {
  next_page_after: null,
  associations: [],
  associations_to: [],
  attachments: [],
  thumbnails: [],
  classification_nodes: [],
  slots: [
    {
      id: 'make_model',
      own: null,
      share_id: null,
      name: 'Make and Model',
      description: null,
      encrypted: null,
      ordinal: null,
      visible: null,
      classification_node_ids: null,
      attachment_id: null,
      slotable_id: null,
      slotable_type: null,
      required: null,
      updated_at: new Date(0),
      created_at: new Date(0),
      slot_type_name: null,
      creator: null,
      encrypted_value: null,
      encrypted_value_verification_key: null,
      value_verification_hash: null,
      image: null,
      label: null,
      original_id: null,
      owner_id: null,
    },
    {
      id: 'add',
      own: null,
      share_id: null,
      name: 'address',
      description: null,
      encrypted: null,
      ordinal: null,
      visible: null,
      classification_node_ids: null,
      attachment_id: null,
      slotable_id: null,
      slotable_type: null,
      required: null,
      updated_at: new Date(0),
      created_at: new Date(0),
      slot_type_name: null,
      creator: null,
      encrypted_value: null,
      encrypted_value_verification_key: null,
      value_verification_hash: null,
      image: null,
      label: null,
      original_id: null,
      owner_id: null,
    },
  ],
  items: [
    {
      id: 'a',
      own: null,
      name: 'My Car',
      label: null,
      description: null,
      created_at: new Date(0),
      item_template_id: null,
      ordinal: null,
      visible: null,
      updated_at: new Date(0),
      item_template_label: null,
      image: null,
      item_image: null,
      item_image_background_colour: null,
      classification_node_ids: null,
      association_ids: null,
      associations_to_ids: null,
      slot_ids: ['make_model'],
      me: null,
      background_color: null,
      original_id: null,
      owner_id: null,
      share_id: null,
    },
    {
      id: 'b',
      own: null,
      name: 'My House',
      label: null,
      description: null,
      created_at: new Date(0),
      item_template_id: null,
      ordinal: null,
      visible: null,
      updated_at: new Date(0),
      item_template_label: null,
      image: null,
      item_image: null,
      item_image_background_colour: null,
      classification_node_ids: null,
      association_ids: null,
      associations_to_ids: null,
      slot_ids: ['add'],
      me: null,
      background_color: null,
      original_id: null,
      owner_id: null,
      share_id: null,
    },
  ],
  meta: [],
};

const responsePart1 = {
  ...response,
  items: [response.items[0]],
  slots: [response.slots[0]],
  next_page_after: MOCK_NEXT_PAGE_AFTER,
  meta: [{ next_page_exists: true }],
};

const responsePart2 = {
  ...response,
  items: [response.items[1]],
  slots: [response.slots[1]],
};
