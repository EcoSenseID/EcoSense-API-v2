import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecretService {
  private client: SecretManagerServiceClient;

  constructor(private config: ConfigService) {
    this.client = new SecretManagerServiceClient();
    Logger.log('Secret manager service initialized');
  }

  private async getSecret(name: string, ver: string) {
    const GCP_ID = this.config.get('GCP_ID');
    const [version] = await this.client.accessSecretVersion({
      name: `projects/${GCP_ID}/secrets/${name}/versions/${ver}`,
    });
    return version.payload.data.toString();
  }

  async getFirebaseSecret() {
    return this.getSecret('ecosense-bangkit-firebase-adminsdk', '2');
  }

  async getStorageSecret() {
    return this.getSecret('ecosense-bangkit-gcs', '2');
  }
}
