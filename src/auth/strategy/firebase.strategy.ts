import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import * as firebase from 'firebase-admin';
import { SecretService } from 'src/secret/secret.service';
import { TEST_USER } from 'test/mocks/mock-user';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, 'firebase') {
  private app: firebase.app.App;
  constructor(private secretManager: SecretService) {
    super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() });
    if (process.env.NODE_ENV !== 'test') this.init();
  }

  private async init() {
    const sec = await this.secretManager.getFirebaseSecret();
    const result: any = await JSON.parse(sec);
    const serviceAccount = {
      type: result.type,
      projectId: result.project_id,
      privateKeyId: result.private_key_id,
      privateKey: result.private_key,
      clientEmail: result.client_email,
      clientId: result.client_id,
      authUri: result.auth_uri,
      tokenUri: result.token_uri,
      authProviderX509CertUrl: result.auth_provider_x509_cert_url,
      clientC509CertUrl: result.client_x509_cert_url,
    };
    this.app = firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
    });
    Logger.log('Firebase initialized');
  }

  async validate(token: string) {
    if (process.env.NODE_ENV === 'test') {
      // TODO: Return mock user based on requested role.
      return TEST_USER;
    }
    const firebaseUser = await this.app
      .auth()
      .verifyIdToken(token, true)
      .catch((err: any) => {
        console.log(err);
        throw new UnauthorizedException(err.message);
      });
    if (!firebaseUser) throw new UnauthorizedException();
    return firebaseUser;
  }
}
