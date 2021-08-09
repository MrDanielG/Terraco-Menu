import { useState, useEffect } from "react";
import Image from "next/image";
import { HiPhotograph } from "react-icons/hi";

interface Props {
  onChange?: (file: File) => void;
}
const upload_endpoint =
  "https://api.cloudinary.com/v1_1/brosimgstorage/image/upload";

export const uploadImage = async (image: File) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "brosimg");
  data.append("cloud_name", "brosimagstorage");

  const url = await fetch(upload_endpoint, {
    method: "post",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data.url);
  return url;
};

const UploadImgWidget = (props: Props) => {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (props.onChange && image) {
      props.onChange(image);
    }
    return () => setImage("");
  }, [image]);

  const onImageChange = (event: React.FormEvent) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      setImage(files[0]);
      setUrl(URL.createObjectURL(files[0]));
    }
  };

  return (
    <div className="w-32 h-32 flex justify-center items-center text-sm text-white text-center bg-brown rounded-full">
      <label htmlFor="file-upload" className="cursor-pointer">
        {/* <span>Upload a file</span> */}
        {url === null && <HiPhotograph className="w-20 h-20" />}
        {url && <img id="target" src={url} />}
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
          onChange={(e) => onImageChange(e)}
        />
      </label>
    </div>
  );
};

export default UploadImgWidget;
