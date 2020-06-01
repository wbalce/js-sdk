import {
  Attachment,
  Item,
  ItemTemplateWithoutAssociations,
  Slot,
  Thumbnail
} from '@meeco/vault-api-sdk';
import { CLIError } from '@oclif/errors';
import { SLOT_TYPE_BLACKLIST } from '../util/constants';
import { ConfigReader, IYamlConfig } from './yaml-config';

export interface IItemTemplate {
  label: string;
  slots: Slot[];
}

export interface IItemMetadata {
  template: string;
  shareId?: string;
}

@ConfigReader<ItemConfig>()
export class ItemConfig {
  static kind = 'Item';

  constructor(public readonly templateName: string, public readonly itemConfig: IItemTemplate) {}

  static fromYamlConfig(yamlConfigObj: IYamlConfig<IItemMetadata, IItemTemplate>): ItemConfig {
    if (yamlConfigObj.kind !== ItemConfig.kind) {
      throw new CLIError(
        `Config file of incorrect kind: ${yamlConfigObj.kind} (expected '${ItemConfig.kind}')`
      );
    }
    return new ItemConfig(yamlConfigObj.metadata.template, yamlConfigObj.spec);
  }

  static encodeFromJson(
    item: Item & { slots?: Slot[]; thumbnails?: Thumbnail[]; attachments?: Attachment[] },
    metadata?: IItemMetadata
  ) {
    const _item = { ...item };

    return {
      kind: ItemConfig.kind,
      ...(metadata ? { metadata } : {}),
      spec: _item
    };
  }

  static encodeFromTemplate(template: ItemTemplateWithoutAssociations & { slots: Slot[] }) {
    const notBlacklisted = (slot: Slot) => !SLOT_TYPE_BLACKLIST.includes(slot.slot_type_name);
    return ItemConfig.encodeFromJson(
      {
        label: '',
        slots: template.slots.filter(notBlacklisted).map(slot => ({
          name: slot.name,
          value: ''
        }))
      } as any,
      {
        template: template.name
      }
    );
  }
}