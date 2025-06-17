import { Html5QrcodeScanner } from "html5-qrcode";
import { useState } from "react";

const [scanning, setScanning] = useState(false);

const HandleOpenCamera = () => {
  setScanning(true);
  const scanner = new Html5QrcodeScanner("reader", {
    fps: 10,
    qrbox: { width: 300, height: 100 }
  }, false);

  scanner.render(
    (decodedText) => {
      setFormData((prev) => ({ ...prev, isbn: decodedText }));
      scanner.clear(); // stop camera
      setScanning(false);
    },
    (errorMessage) => {
      // Optional: handle scan errors
      console.warn(errorMessage);
    }
  );
};
