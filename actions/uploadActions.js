"use server";
import os from "os";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "cloudinary";
import { Review } from "@/models/Review";
import { Comment } from "@/models/Comment";
import { User } from "@/models/User";
import { profile } from "console";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function saveFilesToLocal(formData) {
  const files = formData.getAll("files");

  const multipleBuffersPromise = files.map((file) =>
    file.arrayBuffer().then((data) => {
      const buffer = Buffer.from(data);
      const name = uuidv4();
      const type = file.type.split("/")[0];
      const ext = file.type.split("/")[1];

      const tempdir = os.tmpdir();
      const uploadDir = path.join(tempdir, `${name}.${ext}`);
      fs.writeFile(uploadDir, buffer);
      return {
        filepath: uploadDir,
        filename: file.name,
        id: type === "image" ? 0 : 1,
      };
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

export async function uploadForm(formData, id) {
  try {
    let newFiles;
    let cloudFiles;
    if (formData.getAll("files")) {
      newFiles = await saveFilesToLocal(formData);
      cloudFiles = await uploadFilesToCloudinary(newFiles);

      newFiles.map((file) => fs.unlink(file.filepath));
    }
    const imageCloudFile = cloudFiles.find(
      (file) => file.resource_type === "image"
    );
    const audioCloudFile = cloudFiles.find(
      (file) => file.resource_type === "video"
    );

    const data = formData.getAll("data");

    let imageData;
    let audioData;
    let likes;
    let dislikes;

    if (id) {
      if (data.length === 13) {
        likes = data[11];
        dislikes = data[12];
      } else if (data.length === 14 && imageCloudFile?.secure_url) {
        audioData = data[11];
        likes = data[12];
        dislikes = data[13];
      } else if (data.length === 14 && audioCloudFile?.secure_url) {
        imageData = data[11];
        likes = data[12];
        dislikes = data[13];
      } else {
        imageData = data[11];
        audioData = data[12];
        likes = data[13];
        dislikes = data[14];
      }
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
      image: imageCloudFile?.secure_url
        ? imageCloudFile?.secure_url
        : imageData,
      audio: audioCloudFile?.secure_url
        ? audioCloudFile?.secure_url
        : audioData,
      rate: { likes: likes, dislikes: dislikes } || {
        likes: [],
        dislikes: [],
      },
    });

    !id
      ? await Review.create(newReview)
      : await Review.findByIdAndUpdate(id, {
          $set: {
            name: data[3],
            contentType: data[4],
            review: data[5],
            storyRating: data[6],
            charactersRating: data[7],
            graphicsRating: data[8],
            musicRating: data[9],
            overallRating: data[10],
            image: imageCloudFile?.secure_url
              ? imageCloudFile?.secure_url
              : imageData,
            audio: audioCloudFile?.secure_url
              ? audioCloudFile?.secure_url
              : audioData,
            rate:
              likes && dislikes
                ? { likes: likes, dislikes: dislikes }
                : { likes: [], dislikes: [] },
          },
        });

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

export async function updateAllReviews(profileData) {
  try {
    await Review.updateMany(
      { userEmail: profileData.email },
      {
        $set: {
          userName: profileData.name,
          userAvatar: profileData.image,
        },
      }
    );
    await Comment.updateMany(
      { userEmail: profileData.email },
      {
        $set: {
          userName: profileData.name,
          userAvatar: profileData.image,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function uploadProfileData(formData) {
  try {
    const data = formData.getAll("data");
    let cloudFiles = null;

    if (!data[2]) {
      const newFiles = await saveFilesToLocal(formData);
      cloudFiles = await uploadFilesToCloudinary(newFiles);
      newFiles.map((file) => fs.unlink(file.filepath));
    }

    const newProfileData = {
      email: data[0],
      name: data[1],
      image: cloudFiles !== null ? cloudFiles[0].secure_url : data[2],
    };

    await User.findOneAndUpdate(
      { email: newProfileData.email },
      {
        $set: {
          email: newProfileData.email,
          name: newProfileData.name,
          image: newProfileData.image,
        },
      }
    );

    await updateAllReviews(newProfileData);
  } catch (error) {
    console.log(error);
  }
}
