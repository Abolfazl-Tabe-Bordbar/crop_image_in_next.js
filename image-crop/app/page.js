"use client"
import React, { useState } from 'react';
import CropDemo from '@/components/CropDemo';

const Home = () => {
  const [imageSrc, setImageSrc] = useState(null);

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImageSrc(reader.result));
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={onSelectFile} />
      {imageSrc && <CropDemo src={imageSrc} />}
    </div>
  );
};

export default Home;
