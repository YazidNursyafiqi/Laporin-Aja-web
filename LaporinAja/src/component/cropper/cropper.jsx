import { Cropper } from "react-cropper";
import '../../../node_modules/.pnpm/cropperjs@1.6.2/node_modules/cropperjs/dist/cropper.css';
import { useRef } from "react";
import styles from './cropper.module.css'

function ImageCropper({ image, onCrop }) {
  const cropperRef = useRef(null);

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    const croppedImage = cropper.getCroppedCanvas().toDataURL();
    onCrop(croppedImage);
  };

  return (
    <>  
        <div id={styles.container}>
            <div id={styles.cropperContainer}>
                <Cropper
                    src={image}
                    style={{ height: 400, width: "100%" }}
                    initialAspectRatio={1}
                    guides={false}
                    ref={cropperRef}
                    viewMode={1}
                    
                />
            </div>
            
            <div id={styles.buttonContainer}>
                <button type="button" onClick={handleCrop}>
                    Crop
                </button>
                <button type="button" onClick={() => cropperRef.current.cropper.setAspectRatio(16 / 9)}>
                    16:9
                </button>
                <button type="button" onClick={() => cropperRef.current.cropper.setAspectRatio(3 / 2)}>
                    3:2
                </button>
                <button type="button" onClick={() => cropperRef.current.cropper.setAspectRatio(1 / 1)}>
                    1:1
                </button>
            </div>
        </div>
    </>
  );
}

export default ImageCropper;
