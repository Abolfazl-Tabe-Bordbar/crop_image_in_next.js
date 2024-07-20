"use client";
import axios from "axios";
import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Swal from 'sweetalert2'

function CropDemo({ src }) {
  const [crop, setCrop] = useState({});
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [formData, setFormData] = useState(null);
  let [product_image_path, setProduct_image_path] = useState("")

  let addFile_two = (file) => {
    setProduct_image_path(file);
  }

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const onCropComplete = useCallback((crop) => {
    setCompletedCrop(crop);
  }, []);

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  const handleSaveToFormData = () => {
    const canvas = previewCanvasRef.current;
    if (!completedCrop || !canvas) {
      console.log("11");
      
      const fd = new FormData();
      
      fd.append('image', dataURLtoFile(imgRef.current.src,'croppedImage.png'), 'croppedImage.png');


      axios.post("http://localhost:4000/cropImage",fd).then((result) => {
        if (result.data.status) {
          Swal.fire({
            title: "ذخیره عکس بدون تغییر",
            text: result.data.message,
            icon: "success"
          });
        } else {
          Swal.fire({
            title: "ذخیره عکس بدون تغییر",
            text: result.data.message,
            icon: "error"
          });
        }
      }).catch((err) => {
        Swal.fire({
          title: "ذخیره عکس بدون تغییر",
          text: err,
          icon: "error"
        });
      });
      return;
    }

    canvas.toBlob((blob) => {
      console.log("run");
      const fd = new FormData();
      fd.append('image', blob, 'croppedImage.png');
     
      axios.post("http://localhost:4000/cropImage",fd).then((result) => {
        if (result.data.status) {
          Swal.fire({
            title: "ذخیره عکس با تغییر",
            text: result.data.message,
            icon: "success"
          });
        } else {
          Swal.fire({
            title: "ذخیره عکس با تغییر",
            text: result.data.message,
            icon: "error"
          });
        }
      }).catch((err) => {
        Swal.fire({
          title: "ذخیره عکس با تغییر",
          text: err,
          icon: "error"
        });
      });
    }, 'image/png');
  };

  return (
    <div>
      <ReactCrop
        src={src}
        crop={crop}
        onChange={(newCrop) => setCrop(newCrop)}
        onComplete={onCropComplete}
        onImageLoaded={onLoad}
      >
        <img ref={imgRef} src={src} alt="Source" onChange={e => addFile_two(e.target.file)} />
      </ReactCrop>
      <div className="hidden">
        <canvas
          ref={previewCanvasRef}
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
            border: '1px solid black',
            marginTop: '10px',
            display: completedCrop ? 'block' : 'none'
          }}
        />
      </div>
      <button onClick={handleSaveToFormData} style={{ marginTop: '10px' }}>
        Save to FormData
      </button>
    </div>
  );
}

export default CropDemo;
