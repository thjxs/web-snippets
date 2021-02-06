import { ChangeEvent, useState } from 'react';

export default function BlobImage() {
  const [imgSrc, setImgSrc] = useState('');
  const [loaded, setLoaded] = useState(false);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const imgSrc = URL.createObjectURL(files[0]);
      setImgSrc(imgSrc);
      setLoaded(true);
    }
  };
  return (
    <div>
      <input accept="image/*" onChange={onChange} type="file" name="file" />
      {loaded && (
        <img
          style={{ width: '240px' }}
          alt="load via create object url"
          src={imgSrc}
        />
      )}
    </div>
  );
}
