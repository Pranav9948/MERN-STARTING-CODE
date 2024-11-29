import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import QR from "./QR";

function PdfEinvoice({pdfData}) {


  console.log('pdfData',pdfData)
  const uuid = pdfData.uuid;
  const longId = pdfData.longID;

  const validationLink = `https://preprod.myinvois.hasil.gov.my/${uuid}/share/${longId}`;

  Font.register({
    family: "Roboto",
    fonts: [
      {
        src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf", // Regular
      },
      {
        src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc9.ttf", // Bold
        fontWeight: "bold",
      },
      {
        src: "https://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1Mu51xF.ttf", // Italic
        fontStyle: "italic",
      },
    ],
  });

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#fff",
      padding: 30,
    },
    section: {
      margin: 10,
      paddingLeft: "20px",
      paddingRight: "20px",
      flexGrow: 1,

      border: "2px solid #000",
    },
    issuer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },

    supplierInvoiceDetails: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginTop: "20px",
    },

    supplier: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "start",
      height: "100%",
    },

    invoicedetails: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
      textAlign: "right",
      height: "100%",
    },

    buyer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "start",
      marginTop: "0px",
    },

    table: {
      display: "table",
      width: "100%",

      marginTop: 20,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCell: {
      padding: 8,
      fontSize: 10,
      border: "0.4px solid rgba(0, 0, 0, 0.5); ",
      textAlign: "center",
    },
    tableHeader: {
      backgroundColor: "#008080",
      color: "white",
      fontWeight: "bold",
    },
    tableBody: {
      backgroundColor: "#fff",
    },
    totalRow: {
      backgroundColor: "rgba(0, 128, 128, 0.5)", // Blue background with 50% opacity
      fontWeight: "bold",
      color: "black",
    },

    signatureQRcodeSection: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "between",
      alignItems: "center",
      marginTop: "20px",
    },

    signatureSection: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "center",
      gap: "10px",
    },
    emphasis: { fontFamily: "Helvetica-Bold", color: "#F22300" },
  });

  function formatAddress(postalAddress) {
    const addressLines = postalAddress?.AddressLine?.map(
      (line) => line.Line
    ).join(", ");
    const city = postalAddress?.CityName || "";
    const postalZone = postalAddress?.PostalZone || "";
    const countryCode = postalAddress?.Country?.[0]?.IdentificationCode || "";

    // Mapping country codes to country names
    const countryMapping = {
      MYS: "Malaysia",
      // Add other country codes as needed
    };
    const country = countryMapping[countryCode] || "";

    // Combine all parts into a formatted address string
    return `${addressLines}, ${city} ${postalZone}, ${country}`;
  }


  function formatISOToReadable(dateTimeString) {

    const date = new Date(dateTimeString);
  
  
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const readableDate = date.toLocaleDateString(undefined, options); // 
  
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const readableTime = date.toLocaleTimeString(undefined, timeOptions);
  
    return `${readableDate} ${readableTime}`;
  }




  const {
    AccountingSupplierParty,
    AccountingCustomerParty,
    LegalMonetaryTotal,
    TaxTotal,
    InvoiceLine,
    Signature,
    InvoiceTypeCode,
    ID,DocumentCurrencyCode

  } = pdfData.plainJsonData?.Invoice[0];

  // Extracting the necessary data from invoice object



  const data = InvoiceLine?.map((item) => [
    item.Item[0]?.CommodityClassification[0]?.ItemClassificationCode,
    item?.Item[0]?.Description,
    item?.Price[0]?.PriceAmount,
    item?.TaxTotal[0]?.TaxAmount,
    item?.Discount?.DiscountAmount || 0,
    (
      parseFloat(item?.Price[0]?.PriceAmount) +
      parseFloat(item?.TaxTotal[0]?.TaxAmount) -
      parseFloat(item?.Discount?.DiscountAmount ||0)
    ).toFixed(2),
  ]);

  //  const totals = [
  //     "Total",
  //     "",
  //     invoice.LegalMonetaryTotal.TaxExclusiveAmount ,
  //     invoice.LegalMonetaryTotal.TaxInclusiveAmount ,
  //     invoice?.TotalDiscount || 0 ,
  //     invoice.LegalMonetaryTotal.TaxInclusiveAmount +invoice?.TotalAmountAfterDiscount
  //   ];

  // Calculate totals dynamically based on the data
  const totals = [
    "Total",
    "",
    data?.reduce((sum, row) => sum + parseFloat(row[2]), 0).toFixed(2), // Subtotal sum
    data?.reduce((sum, row) => sum + parseFloat(row[3]), 0).toFixed(2), // Tax sum
    data?.reduce((sum, row) => sum + parseFloat(row[4]), 0).toFixed(2), // Discount sum
    data?.reduce((sum, row) => sum + parseFloat(row[5]), 0).toFixed(2), // Total sum
  ];

  const renderRow = (row, isHeader = false, isTotal = false) => (
    <View
      style={[
        styles.tableRow,
        isHeader ? styles.tableHeader : styles.tableBody,
        isTotal && styles.totalRow,
      ]}
    >
      {row.map((cell, index) => (
        <Text
          key={index}
          style={[styles.tableCell, { flex: index === 1 ? 3 : 1 }]} // Second column is wider
        >
          {cell}
        </Text>
      ))}
    </View>
  );

  return (
    <Document
      title="E-Invoice"
      author="Softlets Group"
      subject="E-Invoice for Tour Package"
      keywords=" e-invoice, tour package"
      language="en"
      pageMode="useOutlines" // Useful for invoices with sections
      onRender={(blob) => console.log("Document rendered:", blob)}
    >
      <Page size="A4" style={styles.page} orientation="portrait">
        <View style={styles.section}>
          <div>
            {/* issuer details */}

            <div style={styles.issuer}>
              <Text
                style={{
                  fontSize: "12px",
                  marginBottom: "10px",
                  marginTop: "30px",
                  fontWeight: "bold",
                  fontFamily: "Helvetica-Bold",
                  color: "#F22300",
                }}
              >
                NZ SOFTLETS SDN BHD
              </Text>

              <Text
                style={{
                  color: "black",
                  fontSize: "10px",
                  marginBottom: "10px",
                  fontWeight: "normal",
                  opacity: "70",
                  fontFamily: "Roboto",
                }}
              >
                Tel: +603-8316 8888
              </Text>
            </div>

            {/* supplier invoice section */}

            <div style={styles.supplierInvoiceDetails}>
              {/* supplier details */}

              <div style={styles.supplier}>
                <Text
                  style={{
                    color: "black",
                    fontSize: "10px",
                    marginBottom: "10px",
                    fontWeight: "bold",
                    opacity: "70",
                    fontFamily: "Roboto",
                  }}
                >
                  Supplier TIN :
                  {
                   " " +  AccountingSupplierParty[0]?.Party[0]?.PartyIdentification[0]
                      ?.ID
                  }
                </Text>

                <Text
                  style={{
                    color: "black",
                    fontSize: "10px",
                    marginBottom: "10px",
                    fontWeight: "bold",
                    opacity: "70",
                    fontFamily: "Roboto",
                  }}
                >
                  Passport ID :
                  { 
                    " " + AccountingSupplierParty[0]?.Party[0]?.PartyIdentification[1]
                      ?.ID
                  }
                </Text>

                <Text
                  style={{
                    color: "black",
                    fontSize: "10px",
                    marginBottom: "10px",
                    fontWeight: "normal",
                    opacity: "70",
                    fontFamily: "Roboto",
                  }}
                >
                  Supplier Name : 
                  { " " + AccountingSupplierParty[0]?.Party[0]?.PartyLegalEntity[0].RegistrationName}
                </Text>

                <Text
                  style={{
                    color: "black",
                    fontSize: "10px",
                    marginBottom: "10px",
                    fontWeight: "normal",
                    opacity: "70",
                    fontFamily: "Roboto",
                  }}
                >
                  Supplier MSIC code : 
                  { " " + AccountingSupplierParty[0]?.Party[0]?.IndustryClassificationCode}
                </Text>

                <Text
                  style={{
                    color: "black",
                    fontSize: "10px",
                    marginBottom: "10px",
                    fontWeight: "normal",
                    opacity: "70",
                    fontFamily: "Roboto",
                  }}
                >
                 Business activity description: Travel agency
                  activities
                </Text>

                <Text
                  style={{
                    color: "black",
                    fontSize: "10px",
                    marginBottom: "10px",
                    fontWeight: "normal",
                    opacity: "70",
                    width: "55%",
                    fontFamily: "Roboto",
                    lineHeight: "16px",
                  }}
                >
                  Address :
                  {" " + formatAddress(AccountingSupplierParty[0]?.Party[0]?.PostalAddress[0])}
                </Text>

                <Text
                  style={{
                    color: "black",
                    fontSize: "10px",
                    marginBottom: "10px",
                    fontWeight: "normal",
                    opacity: "70",
                    fontFamily: "Roboto",
                  }}
                >
                  Supplier Contact Number :
                  {" "+ AccountingSupplierParty[0]?.Party[0]?.Contact[0]?.Telephone}
                </Text>
              </div>

              {/* invoice details */}

              <div style={styles.invoicedetails}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: "12px",
                      marginBottom: "10px",
                      fontWeight: "bold",
                      opacity: "70",
                      textAlign: "right",
                      fontFamily: "Roboto",
                    }}
                  >
                    E-INVOICE
                  </Text>

                  <Text
                    style={{
                      color: "black",
                      fontSize: "10px",
                      marginBottom: "10px",
                      fontWeight: "bold",
                      opacity: "70",
                      fontFamily: "Roboto",
                    }}
                  >
                    UUID : {pdfData.uuid}
                  </Text>

                  <Text
                    style={{
                      color: "black",
                      fontSize: "10px",
                      marginBottom: "10px",
                      fontWeight: "normal",
                      opacity: "70",
                      fontFamily: "Roboto",
                    }}
                  >
                    Issuance Date : {formatISOToReadable(pdfData.dateTimeValidated)}
                  </Text>

                  <Text
                    style={{
                      color: "black",
                      fontSize: "10px",
                      marginBottom: "10px",
                      fontWeight: "normal",
                      opacity: "70",
                      fontFamily: "Roboto",
                    }}
                  >
                    e-Invoice Type : {InvoiceTypeCode}
                  </Text>

                  <Text
                    style={{
                      color: "black",
                      fontSize: "10px",
                      marginBottom: "10px",
                      fontWeight: "normal",
                      opacity: "70",
                      fontFamily: "Roboto",
                    }}
                  >
                    e-Invoice code : {ID}
                  </Text>

                  <Text
                    style={{
                      color: "black",
                      fontSize: "10px",
                      marginBottom: "10px",
                      fontWeight: "normal",
                      opacity: "70",
                      fontFamily: "Roboto",
                    }}
                  >
                    Currency Code: {DocumentCurrencyCode}
                  </Text>
                </div>
              </div>
            </div>

            {/* line-breaker */}

            <div
              style={{
                border: "1px solid black",
                width: "100%",
                height: "1px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            ></div>

            {/* Buyer */}

            <div style={styles.buyer}>
              <Text
                style={{
                  color: "black",
                  fontSize: "10px",
                  marginBottom: "10px",
                  fontWeight: "bold",
                  opacity: "70",
                  fontFamily: "Roboto",
                }}
              >
                Buyer TIN :
                { " "+ AccountingCustomerParty[0]?.Party[0]?.PartyIdentification[0]?.ID}
              </Text>

              <Text
                style={{
                  color: "black",
                  fontSize: "10px",
                  marginBottom: "10px",
                  fontWeight: "bold",
                  opacity: "70",
                  fontFamily: "Roboto",
                }}
              >
                Buyer Name :
                {" "+ AccountingCustomerParty[0]?.Party[0]?.PartyLegalEntity[0].RegistrationName }
              </Text>

              <Text
                style={{
                  color: "black",
                  fontSize: "10px",
                  marginBottom: "10px",
                  fontWeight: "normal",
                  opacity: "70",
                  fontFamily: "Roboto",
                }}
              >
                Buyer Identification Number :
                { " "+ AccountingCustomerParty[0]?.Party[0]?.PartyIdentification[1]?.ID}
              </Text>

              <Text
                style={{
                  color: "black",
                  fontSize: "10px",
                  marginBottom: "10px",
                  fontWeight: "normal",
                  opacity: "70",
                  width: "70%",
                  fontFamily: "Roboto",
                }}
              >
                Buyer Address :
                {" " + formatAddress(AccountingCustomerParty[0]?.Party[0]?.PostalAddress[0])}
              </Text>

              <Text
                style={{
                  color: "black",
                  fontSize: "10px",
                  marginBottom: "10px",
                  fontWeight: "normal",
                  opacity: "70",
                  fontFamily: "Roboto",
                }}
              >
                Buyer Contact Number :
                {" "+AccountingCustomerParty[0]?.Party[0]?.Contact[0]?.Telephone}
              </Text>
            </div>

            {/* Table */}

            {/* Table */}

          
            <div >
              {/* Table */}
              <View style={styles.table}>
                {/* Table Header */}
                {renderRow(
                  [
                    "Code",
                    "Description of Service",
                    "Subtotal",
                    "Tax Amount",
                    "Discount Amount",
                    "Total Amount",
                  ],
                  true
                )}

                {/* Table Body */}
                {data?.map((row, index) => renderRow(row))}

                {/* Total Row */}
                {renderRow(totals, false, true)}
              </View>

              <View style={styles.signatureQRcodeSection}>
                <div style={styles.signatureQRcode}>
                  <Text
                    style={{
                      color: "black",
                      fontSize: "10px",
                      marginBottom: "10px",
                      fontWeight: "bold",
                      opacity: "70",
                      fontFamily: "Roboto",
                    }}
                  >
                    Digital Signature : 98654ertftugxu23567897thcb
                  </Text>

                  <Text
                    style={{
                      color: "black",
                      fontSize: "10px",
                      marginBottom: "10px",
                      fontWeight: "bold",
                      opacity: "70",
                      fontFamily: "Roboto",
                    }}
                  >
                    Date and Time of validation : {formatISOToReadable(pdfData.dateTimeValidated)}
                  </Text>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <QR
                    url={validationLink}
                    width={64}
                    foreground="#000"
                    background="#fff"
                  />
                </div>
              </View>
            </div>
          </div>
        </View>
      </Page>
    </Document>
  );
}
export default PdfEinvoice;
