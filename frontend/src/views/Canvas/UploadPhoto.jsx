import React from "react";
import ImageUploader from "react-images-upload";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function UploadPhoto({ onDrop }) {
  return (
    <>
      <Grid item xs>
        <div>
          <ImageUploader
            withIcon={true}
            label={"Accepted formats: jpg, png. Max size 5mb."}
            buttonText="Choose images"
            onChange={onDrop}
            imgExtension={[".jpg", ".png"]}
            singleImage
            withPreview
            maxFileSize={5242880}
          />
        </div>
      </Grid>
      <Grid item xs={12} alignItems={"center"}>
        <Typography variant={"h6"} gutterBottom>
          Give your best shot a try
        </Typography>
      </Grid>
    </>
  );
}

export default UploadPhoto;
