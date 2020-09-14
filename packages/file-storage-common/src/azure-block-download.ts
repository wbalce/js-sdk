import * as Cryppo from '@meeco/cryppo';
import { CipherStrategy } from '@meeco/cryppo';
import { EncryptionKey } from './encryption-key';
import { BlobStorage } from './services/Azure';

export class AzureBlockDownload {
  /**
   * @param {String} url Where to download the file
   *
   */
  url: any;
  constructor(url: string) {
    if (typeof url !== 'string') {
      throw new Error('url must be a string');
    }

    this.url = url;
  }

  /**
   * Start downloading
   */
  async start(
    dataEncryptionKey: EncryptionKey | null,
    strategy: CipherStrategy | null,
    encryptionArtifact: any,
    range: string | null
  ) {
    if (range) {
      const block = await BlobStorage.getBlock(this.url, range);
      const data = new Uint8Array(block.data);
      let byteNumbers: Uint8Array;
      if (dataEncryptionKey && strategy && encryptionArtifact) {
        const str = Cryppo.decryptWithKeyUsingArtefacts(
          dataEncryptionKey.key,
          Cryppo.binaryBufferToString(data),
          strategy,
          encryptionArtifact
        );

        byteNumbers = new Uint8Array(Cryppo.stringAsBinaryBuffer(str));
      }
      return new Promise(resolve => {
        resolve(byteNumbers || data);
      });
    } else {
      const blob = await BlobStorage.getBlock(this.url, null);
      return new Promise(resolve => {
        resolve(blob.data);
      });
    }
  }
}
