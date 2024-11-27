import React from 'react'
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
import PdfEinvoice from './PdfEinvoice';

function DownloadPdf() {
  return (
    <PDFDownloadLink document={<PdfEinvoice/>} fileName="e-invoice.pdf">
    {({ blob, url, loading, error }) =>
      loading ? 'Loading document...' : 'Download now!'
    }
  </PDFDownloadLink>
  )
}

export default DownloadPdf
