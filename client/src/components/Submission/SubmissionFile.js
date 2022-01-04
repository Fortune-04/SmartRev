import React, { useState } from 'react';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TheatersIcon from '@mui/icons-material/Theaters';

const handlePreviewIcon = (fileObject, classes) => {
  const {type} = fileObject.file
  const iconProps = {
    className : classes.image,
  }

  if (type.startsWith("video/")) return <TheatersIcon {...iconProps} />
  if (type.startsWith("audio/")) return <AudiotrackIcon {...iconProps} />

  switch (type) {
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return <DescriptionIcon {...iconProps} />
    case "application/pdf":
      return <PictureAsPdfIcon {...iconProps} />
    default:
      return <AttachFileIcon {...iconProps} />
  }
}



const SubmissionFile = () =>{

    const [fileObjects, setFileObjects] = useState([]);

    return(
        <DropzoneAreaBase
            fileObjects={fileObjects}
            onAdd={newFileObjs => {
                console.log('onAdd', newFileObjs);
                setFileObjects([].concat(fileObjects, newFileObjs));
            }}
            onDelete={deleteFileObj => {
                console.log('onDelete', deleteFileObj);
            }}
            getPreviewIcon={handlePreviewIcon}
        />
    )
}

export default SubmissionFile;
