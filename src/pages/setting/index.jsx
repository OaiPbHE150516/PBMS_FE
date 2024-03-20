import React, { useState, useEffect } from 'react';
import { getInvoiceScan } from "../../redux/scanInvoiceSlice";
import { useDispatch } from "react-redux";

const ImageForm = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [showFields, setShowFields] = useState(false);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    console.log('Selected image:', selectedImage);
    setImage(selectedImage);
    setShowFields(true);
  };

  useEffect(() => {
    const scanImage = async () => {
      if (image) {
        console.log('ảnh nè:', image);
        // Gửi đối tượng file cho action getInvoiceScan
        dispatch(getInvoiceScan(image));
      }
    };
  
    scanImage();
  }, [image, dispatch]);
  

  return (
    <div>
      <h2>Thông tin ảnh</h2>
      <form>
        <div>
          <label htmlFor="image">Tải ảnh lên:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {image && (
          <div>
            <img src={URL.createObjectURL(image)} alt="Selected" style={{ maxWidth: '100%' }} />
          </div>
        )}
      </form>
    </div>
  );
};

export default ImageForm;
