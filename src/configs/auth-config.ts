import { CLIError } from '@oclif/errors';
import { EncryptionKey } from '../models/encryption-key';
import { IYamlConfig } from './yaml-config';

interface IAuthMetadata {
  secret: string;
  vault_access_token: string;
  keystore_access_token: string;
  passphrase_derived_key: string | EncryptionKey; // base64
  key_encryption_key: string | EncryptionKey; // base64
  data_encryption_key: string | EncryptionKey; // base64
}

export class AuthConfig {
  static kind = 'Authentication';

  public readonly secret: string;
  public readonly vault_access_token: string;
  public readonly keystore_access_token: string;
  public readonly data_encryption_key: EncryptionKey;
  public readonly key_encryption_key: EncryptionKey;
  public readonly passphrase_derived_key: EncryptionKey;

  constructor(data: AuthConfig) {
    this.secret = data.secret;
    this.keystore_access_token = data.keystore_access_token;
    this.vault_access_token = data.vault_access_token;
    this.data_encryption_key = data.data_encryption_key;
    this.key_encryption_key = data.key_encryption_key;
    this.passphrase_derived_key = data.passphrase_derived_key;
  }

  static fromYamlConfig(yamlConfigObj: IYamlConfig<IAuthMetadata>): AuthConfig {
    if (yamlConfigObj.kind !== AuthConfig.kind) {
      throw new CLIError(
        `Config file of incorrect kind: ${yamlConfigObj.kind} (expected '${AuthConfig.kind}')`
      );
    }
    return new AuthConfig({
      ...yamlConfigObj.metadata,
      key_encryption_key: EncryptionKey.fromSerialized(
        yamlConfigObj.metadata.key_encryption_key as string
      ),
      data_encryption_key: EncryptionKey.fromSerialized(
        yamlConfigObj.metadata.data_encryption_key as string
      ),
      passphrase_derived_key: EncryptionKey.fromSerialized(
        yamlConfigObj.metadata.passphrase_derived_key as string
      )
    });
  }

  static fromMetadata(metadata: IAuthMetadata) {
    return AuthConfig.fromYamlConfig({
      kind: AuthConfig.kind,
      metadata,
      spec: {}
    });
  }

  static encodeFromJson(payload: AuthConfig): IYamlConfig<IAuthMetadata> {
    return {
      kind: AuthConfig.kind,
      metadata: payload as any, // EncryptionKey's should stringify with their own `toJSON()`
      spec: {}
    };
  }
}