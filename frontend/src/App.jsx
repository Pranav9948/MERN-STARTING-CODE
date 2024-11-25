import React from "react";
import { useState } from "react";
import "./App.css";
import QRCode from "react-qr-code";
import { PDFViewer } from '@react-pdf/renderer';
import PdfEinvoice from "./components/PdfEinvoice";

function App() {
  const [qrIsVisible, setQrIsVisible] = useState(false);
  const [url, setUrl] = useState("");

  const generatePdf = () => {
    console.log("generating pdf");

    const uuid = "0VG95YXFXBCGSHANREF919DJ10";
    const longId = "T7MNFTKAMMBZEDMAREF919DJ10sBXpFC1732248911";

    const validationLink = `https://preprod.myinvois.hasil.gov.my/${uuid}/share/${longId}`;
    setUrl(validationLink);

    setQrIsVisible(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        {!qrIsVisible && (
          <button
            onClick={generatePdf}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            View Pdf Invoice
          </button>
        )} 


        {qrIsVisible && (
          <PDFViewer style={{width: "100%", height: "100vh"}}>
            <PdfEinvoice />
          </PDFViewer>
       )} 
      </div>
    </>
  );
}

export default App; 
