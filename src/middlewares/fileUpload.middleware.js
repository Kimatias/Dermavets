import fileUpload from "express-fileupload";

export const fileUploadMiddleware = fileUpload({
  useTempFiles: true,
  tempFileDir: "./public/uploads",
});
