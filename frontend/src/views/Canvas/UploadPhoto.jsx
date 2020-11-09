import React from "react";
import ImageUploader from "react-images-upload";
import Grid from "@material-ui/core/Grid";

function UploadPhoto({onDrop}) {
  return (
    <Grid item xs={8}>
      <div>
        <ImageUploader
          withIcon={true}
          buttonText="Choose images"
          onChange={onDrop}
          imgExtension={[".jpg", ".png"]}
          singleImage
          withPreview
          maxFileSize={5242880}
        />
      </div>
    </Grid>
  );
}

export default UploadPhoto;
