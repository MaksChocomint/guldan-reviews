"use server";
import os from "os";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "cloudinary";
import { Review } from "@/models/Review";
import { Comment } from "@/models/Comment";
import mongoose from "mongoose";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function saveFilesToLocal(formData) {
  const files = formData.getAll("files");

  const multipleBuffersPromise = files.map((file, index) =>
    file.arrayBuffer().then((data) => {
      const buffer = Buffer.from(data);
      const name = uuidv4();
      const ext = file.type.split("/")[1];

      const tempdir = os.tmpdir();
      const uploadDir = path.join(tempdir, `${name}.${ext}`);
      fs.writeFile(uploadDir, buffer);
      return { filepath: uploadDir, filename: file.name, id: index };
    })
  );

  return await Promise.all(multipleBuffersPromise);
}

async function uploadFilesToCloudinary(newFiles) {
  const multipleFilesPromise = newFiles.map((file) => {
    if (file) {
      if (file.id === 0) {
        return cloudinary.v2.uploader.upload(file.filepath, {
          folder: "gul'dan-reviews/image",
          resource_type: "image",
        });
      } else if (file.id === 1) {
        return cloudinary.v2.uploader.upload(file.filepath, {
          folder: "gul'dan-reviews/audio",
          resource_type: "video",
        });
      }
    }
  });
  return await Promise.all(multipleFilesPromise);
}

export async function uploadForm(formData) {
  try {
    const newFiles = await saveFilesToLocal(formData);

    const cloudFiles = await uploadFilesToCloudinary(newFiles);

    newFiles.map((file) => fs.unlink(file.filepath));

    const data = formData.getAll("data");
    if (data[1] === "makschocomint@gmail.com") {
      data[0] = "Гул'дан";
      data[2] = "https://i.imgur.com/DPjLpCG.jpg?1";
    }

    const newReview = new Review({
      userName: data[0],
      userEmail: data[1],
      userAvatar: data[2],
      name: data[3],
      contentType: data[4],
      review: data[5],
      storyRating: data[6],
      charactersRating: data[7],
      graphicsRating: data[8],
      musicRating: data[9],
      overallRating: data[10],
      image: cloudFiles[0].secure_url,
      audio: cloudFiles[1] ? cloudFiles[1].secure_url : null,
      rate: { likes: [], dislikes: [] },
    });

    await Review.create(newReview);

    return { msg: "Review Upload Success!" };
  } catch (error) {
    return { errMsg: error.message };
  }
}

export async function uploadComment(commentData) {
  try {
    const data = commentData;
    if (data[1] === "makschocomint@gmail.com") {
      data[0] = "Гул'дан";
      data[2] = "https://i.imgur.com/DPjLpCG.jpg?1";
    }

    const newComment = new Comment({
      userName: data[0],
      userEmail: data[1],
      userAvatar: data[2],
      message: data[3],
      reviewId: data[4],
    });

    await Comment.create(newComment);

    return { msg: "Comment Upload Success!" };
  } catch (error) {
    return { errMsg: error.message };
  }
}

export async function uploadProfileData(formData) {
  try {
    const data = formData.getAll("data");
    let cloudFiles = null;
    console.log("4");
    if (!data[3]) {
      const newFiles = await saveFilesToLocal(formData);
      cloudFiles = await uploadFilesToCloudinary(newFiles);
      newFiles.map((file) => fs.unlink(file.filepath));
    }
    console.log("3");

    const newProfileData = {
      email: data[0],
      name: data[1],
      image: cloudFiles ? cloudFiles[0].secure_url : data[3],
    };

    console.log("2");

    await mongoose.models.Users.findOneAndUpdate(
      { email: newProfileData.email },
      {
        $set: {
          email: newProfileData.email,
          name: newProfileData.name,
          image: newProfileData.image,
        },
      }
    );
    console.log("1");
  } catch (error) {
    return { errMsg: error.message };
  }
}
