const prisma = require("../db");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const dotenv = require("dotenv").config();
const crypto = require("crypto");

const bucketRegion = process.env.BUCKET_REGION;
const bucketName = process.env.BUCKET_NAME;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const createPost = async (req, res) => {
  const params = {
    Bucket: bucketName,
    Key: randomImageName(),
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };
  const command = new PutObjectCommand(params);

  await s3.send(command);

  const imageName = randomImageName();

  try {
    const { title, tags, short_description, description } = req.body;
    console.log(title);
    const post = await prisma.post.create({
      data: {
        title,
        tags,
        short_description,
        description,
        image: imageName,
      },
    });

    res.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const displayAllPosts = async (req, res) => {
  const posts = await prisma.post.findMany();

  for (const post of posts) {
    const getObjectParams = {
      Bucket: bucketName,
      Key: post.image,
    };

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command);

    post.imageUrl = url;
  }

  res.json(posts);
};

const singlePostProperties = async (req, res) => {
  try {
    const id = req.params.id;

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    console.log(post);
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createPost,
  displayAllPosts,
  singlePostProperties,
};
