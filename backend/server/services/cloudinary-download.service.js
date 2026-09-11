import axios from "axios";

export const downloadFileAsBuffer = async (url) => {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });

  return Buffer.from(response.data);
};