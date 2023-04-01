import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const client = new SecretManagerServiceClient();
export const getSecret = async (name: string, ver: string) => {
  const GCP_ID = process.env.GCP_ID;
  const [version] = await client.accessSecretVersion({
    name: `projects/${GCP_ID}/secrets/${name}/versions/${ver}`, // enter the copied resource id here
  });
  return version.payload.data.toString();
};
