import React from "react";
import { useState } from "react";
import "./App.css";
import QRCode from "react-qr-code";
import { PDFViewer } from "@react-pdf/renderer";
import PdfEinvoice from "./components/PdfEinvoice";
import axios from "axios";

function App() {
  const [qrIsVisible, setQrIsVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [showInvoiceButton,setShowInvoiceButton] = useState(false);
  const [pdfData,setPdfData]=useState()

  const generatePdf = () => {
    console.log("generating pdf");

    const uuid = "0VG95YXFXBCGSHANREF919DJ10";
    const longId = "T7MNFTKAMMBZEDMAREF919DJ10sBXpFC1732248911";

    const validationLink = `https://preprod.myinvois.hasil.gov.my/${uuid}/share/${longId}`;
    setUrl(validationLink);

    setQrIsVisible(true);
  };



  const [uuid, setUuid] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uuid) {
      alert("Please enter a valid UUID");
      return;
    }

    try {
    
      const authToken =`eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk2RjNBNjU2OEFEQzY0MzZDNjVBNDg1MUQ5REM0NTlFQTlCM0I1NTRSUzI1NiIsIng1dCI6Imx2T21Wb3JjWkRiR1draFIyZHhGbnFtenRWUSIsInR5cCI6ImF0K2p3dCJ9.eyJpc3MiOiJodHRwczovL3ByZXByb2QtaWRlbnRpdHkubXlpbnZvaXMuaGFzaWwuZ292Lm15IiwibmJmIjoxNzMyNzA2NTYxLCJpYXQiOjE3MzI3MDY1NjEsImV4cCI6MTczMjcxMDE2MSwiYXVkIjpbIkludm9pY2luZ0FQSSIsImh0dHBzOi8vcHJlcHJvZC1pZGVudGl0eS5teWludm9pcy5oYXNpbC5nb3YubXkvcmVzb3VyY2VzIl0sInNjb3BlIjpbIkludm9pY2luZ0FQSSJdLCJjbGllbnRfaWQiOiJmNDJjYjgzMC1jOTI2LTRlY2YtYjNjZi0wNmNhOTcyODIxNDMiLCJJc1RheFJlcHJlcyI6IjEiLCJJc0ludGVybWVkaWFyeSI6IjAiLCJJbnRlcm1lZElkIjoiMCIsIkludGVybWVkVElOIjoiIiwiSW50ZXJtZWRST0IiOiIiLCJJbnRlcm1lZEVuZm9yY2VkIjoiMiIsIm5hbWUiOiJJRzI0MzU3NTcxMDgwOmY0MmNiODMwLWM5MjYtNGVjZi1iM2NmLTA2Y2E5NzI4MjE0MyIsIlNTSWQiOiIyZjg4MjQwYi1jYTFlLTE1NGEtN2YyOS00ZDhlYzQ2MDQ0Y2MiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJUcmF2byBFLWludm9pY2UiLCJUYXhJZCI6IjI5ODQ0IiwiVGF4cGF5ZXJUSU4iOiJJRzI0MzU3NTcxMDgwIiwiVGF4VGluIjoiSUcyNDM1NzU3MTA4MCIsIlByb2ZJZCI6IjM3NTAyIiwiSXNUYXhBZG1pbiI6IjAiLCJJc1N5c3RlbSI6IjEifQ.iQAjUyjqXlHzk4h8p-NBo_WdWSPhB-ldPj05j6sJTchQRB4Dw2LmzJ6xJwZbco-Et5xvP-ZTQS9NeKy5ofB2KGKlio08rA2DdITOXGvuoTALm_UtNa5VN7uY83AB-3-0_SyYVE0wP3l0BqJCF6kmv1UfGJ_n7XKabqYCH_vLCc8ZKm_DcpfpaDiuA8MZJAqMj9IaG0Tpjf-a54CoMoRYSgVVRjYyR4Ak_Z0X_5q_jMetzeHnmJ6eYZSE_OReBLCiiMPDlUAV6yS1W5h24J4PpQjpg6eRb-vSW7ktQrDmTGcVwTMthDOoHRQruCKqvLCBNctU6V6gng42n1ONukfUbg`

      const response = await axios.post(
        "http://localhost:7000/api/pdf/get-pdf-data",
        { UUID: uuid }, 
        {
          headers: {
            authorizationtoken: authToken, 
          },
        }
      );
      setPdfData(response.data);

      
      alert("API call successful!");
      setShowInvoiceButton(true)
    } catch (error) {
      console.error("Error making API call:", error);
      alert("Failed to make the API call.");
    }
  };

  return (
    <>
    
    { showInvoiceButton && <div className="flex flex-col items-center justify-center h-screen">
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
            <PdfEinvoice pdfData={pdfData} />
          </PDFViewer>
       )}  </div> }

      { !showInvoiceButton && <div className="flex items-center justify-center h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white rounded-lg shadow-md space-y-4"
        >
          <h2 className="text-xl font-bold text-gray-700 text-center">
            Enter UUID
          </h2>
          <input
            type="text"
            value={uuid}
            onChange={(e) => setUuid(e.target.value)}
            placeholder="Enter UUID"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
        </form>
      </div> }
    </>
  );
}

export default App;
