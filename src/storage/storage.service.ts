import { Injectable, Logger } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { getSecret } from 'src/helpers';

@Injectable()
export class StorageService {
  private storage: Storage;

  constructor() {
    this.storageInit();
  }

  private async storageInit() {
    const sec = await getSecret('ecosense-bangkit-gcs', '2');
    const result: any = await JSON.parse(sec);
    const storage = new Storage({
      projectId: 'ecosense-bangkit',
      credentials: result,
    });
    this.storage = storage;
    Logger.log('Storage service initialized');
  }

  private getPublicUrl(bucketName: string, fileName: string) {
    return `https://storage.googleapis.com/${bucketName}/${encodeURIComponent(
      fileName,
    )}`;
  }

  private async upload(reqFile: Express.Multer.File, bucketName: string) {
    if (!reqFile || !bucketName) {
      throw new Error('File or bucket name not found');
    }
    const bucket = this.storage.bucket(bucketName);
    const gcsFileName = `${Date.now()}-${reqFile.originalname}`;
    const file = bucket.file(gcsFileName);

    const stream = file.createWriteStream({
      metadata: { contentType: reqFile.mimetype },
    });

    stream.on('error', (err) => {
      return { error: true, errorDetail: err };
    });

    let gcsUrl = '';
    stream.on('finish', async () => {
      await file.makePublic();
      gcsUrl = this.getPublicUrl(bucketName, gcsFileName);
    });

    stream.end(reqFile.buffer);
    return {
      error: false,
      gcsUrl: gcsUrl || this.getPublicUrl(bucketName, gcsFileName),
    };
  }

  async uploadRewardPoster(reqFile: Express.Multer.File) {
    return this.upload(reqFile, 'ecosense-reward-posters');
  }

  async uploadStoryPhoto(reqFile: Express.Multer.File) {
    return this.upload(reqFile, 'ecosense-story-photos');
  }

  async uploadReplyPhoto(reqFile: Express.Multer.File) {
    return this.upload(reqFile, 'ecosense-reply-photos');
  }

  async uploadCampaignPoster(reqFile: Express.Multer.File) {
    return this.upload(reqFile, 'ecosense-campaign-posters');
  }

  async uploadTaskProof(reqFile: Express.Multer.File) {
    return this.upload(reqFile, 'ecosense-task-proofs');
  }
}
