import {
  CognitoIdentityClient,
  GetCredentialsForIdentityCommand,
  GetIdCommand,
} from "@aws-sdk/client-cognito-identity";
import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { fetchImages } from "../../api";
import { ImagesTable } from "./ImagesTable";

const region = import.meta.env.VITE_AWS_REGION;
const bucketName = import.meta.env.VITE_BUCKET_NAME;
const identityPoolId = import.meta.env.VITE_IDENTITY_POOL_ID;
const userPoolId = import.meta.env.VITE_USER_POOL_ID;

const fetchAwsCredentials = async (idToken: string) => {
  const cognitoIdentity = new CognitoIdentityClient({ region: region });

  // Step 1: Get the identity ID
  const { IdentityId } = await cognitoIdentity.send(
    new GetIdCommand({
      IdentityPoolId: identityPoolId,
      Logins: {
        [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: idToken,
      },
    })
  );

  // Step 2: Get temporary AWS credentials
  const credentialsResponse = await cognitoIdentity.send(
    new GetCredentialsForIdentityCommand({
      IdentityId,
      Logins: {
        [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: idToken,
      },
    })
  );

  return credentialsResponse.Credentials;
};

export const ImagesPage = () => {
  const auth = useAuth();

  const idToken = auth.user?.id_token || "";

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) {
      return null;
    }

    const file = event.target.files[0];

    const credentials = await fetchAwsCredentials(idToken)!;

    if (!credentials) {
      throw new Error("empty credentials");
    }

    const s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId: credentials.AccessKeyId!,
        secretAccessKey: credentials.SecretKey!,
        sessionToken: credentials.SessionToken!,
      },
    });

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: file.name,
        Body: await file.arrayBuffer(),
        ACL: ObjectCannedACL.public_read,
      })
    );
  };

  const { data } = useQuery({
    queryKey: ["repoData"],
    queryFn: fetchImages,
  });

  const rows = data?.data || [];

  return (
    <Container>
      <Box mt={4} mb={4}>
        <Button
          sx={{ m: 4, width: 200 }}
          variant="contained"
          onClick={() => auth.removeUser()}
        >
          Logout
        </Button>
        <Typography variant="h5" align="center" gutterBottom>
          Upload Images
        </Typography>
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Upload Files
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleFileUpload}
            />
          </Button>
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" align="center" gutterBottom>
          Image Gallery
        </Typography>
        <Grid2 container spacing={2}>
          {rows.length === 0 ? (
            <Typography
              variant="body1"
              align="center"
              style={{ width: "100%", marginTop: "20px" }}
            >
              No images uploaded yet.
            </Typography>
          ) : (
            <ImagesTable data={rows} />
          )}
        </Grid2>
      </Box>
    </Container>
  );
};
