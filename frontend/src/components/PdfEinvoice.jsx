import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import QR from "./QR";

function PdfEinvoice() {
  const uuid = "0VG95YXFXBCGSHANREF919DJ10";
  const longId = "T7MNFTKAMMBZEDMAREF919DJ10sBXpFC1732248911";

  const validationLink = `https://preprod.myinvois.hasil.gov.my/${uuid}/share/${longId}`;

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#fff",
      padding: 30,
    },
    section: {
      margin: 10,
      paddingLeft: "40px",
      paddingRight: "40px",
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
      alignItems: "center",
    },

    supplier: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "start",
      marginTop: "40px",
    },

    invoicedetails: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "end",
      marginTop: "40px",

      textAlign: "right",
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
      borderCollapse: "collapse",
      marginTop: 20,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCell: {
      padding: 8,
      fontSize: 10,
      border: "1px solid black",
      textAlign: "center",
    },
    tableHeader: {
      backgroundColor: "#1E90FF",
      color: "white",
      fontWeight: "bold",
    },
    tableBody: {
      backgroundColor: "#fff",
    },
    totalRow: {
      backgroundColor: "rgba(30, 144, 255, 0.5)", // Blue background with 50% opacity
      fontWeight: "bold",
      color: "black",
    },

    signatureQRcodeSection: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "between",
      alignItems: "center",
      marginTop: "40px",
    },

    signatureSection: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "center",
      gap: "10px",
    },
  });

  const data = [
    [
      "008",
      "Jungle Wildlife Safari",
      "6600.00",
      "1000.00",
      "100.00",
      "7500.00",
    ],
    ["008", "Boat Transportation", "200.00", "0.00", "0.00", "200.00"],
    ["008", "Land Transportation", "400.00", "0.00", "0.00", "400.00"],
    ["008", "Ocean View Deluxe Room", "2200.00", "200.00", "0.00", "2400.00"],
  ];

  const totals = ["Total", "", "9400.00", "1200.00", "0.00", "10500.00"];

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
    pageLayout="singlePage" // Ensures a single-page view layout
    onRender={(blob) => console.log("Document rendered:", blob)}
  >
    <Page size="A4" style={styles.page} orientation="landscape">
      <View style={styles.section}>
        <div>
          {/* issuer details */}

          <div style={styles.issuer}>
            <Text
              style={{
                color: "black",
                fontSize: "12px",
                marginBottom: "10px",
                marginTop: "30px",
                fontWeight: "bold",
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
              }}
            >
              SA-09-10, Menara Paragon, Persiaran Bestari, Cyber 11, 63000
              Cyberjaya, Selangor, Malaysia
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: "10px",
                marginBottom: "10px",
                fontWeight: "normal",
                opacity: "70",
              }}
            >
              Tel: +603-8316 8888
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: "10px",
                marginBottom: "10px",
                fontWeight: "normal",
                opacity: "70",
              }}
            >
              contact us : info@thesoftlets.com
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
                }}
              >
                Supplier TIN : IG24357571080
              </Text>

              <Text
                style={{
                  color: "black",
                  fontSize: "10px",
                  marginBottom: "10px",
                  fontWeight: "bold",
                  opacity: "70",
                }}
              >
                Supplier Registration Number : Z5713582
              </Text>

              <Text
                style={{
                  color: "black",
                  fontSize: "10px",
                  marginBottom: "10px",
                  fontWeight: "normal",
                  opacity: "70",
                }}
              >
                Supplier ID Type : PASSPORT
              </Text>

              <Text
                style={{
                  color: "black",
                  fontSize: "10px",
                  marginBottom: "10px",
                  fontWeight: "normal",
                  opacity: "70",
                }}
              >
                Supplier MSIC code: 79110
              </Text>

              <Text
                style={{
                  color: "black",
                  fontSize: "10px",
                  marginBottom: "10px",
                  fontWeight: "normal",
                  opacity: "70",
                }}
              >
                Supplier business activity description: Travel agency
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
                }}
              >
                Supplier Address : Lot 66,Bangunan Merdeka,Persiaran
                Jaya,50480,
                <br /> Kuala Lumpur, Selangor Malaysia
              </Text>

              <Text
                style={{
                  color: "black",
                  fontSize: "10px",
                  marginBottom: "10px",
                  fontWeight: "normal",
                  opacity: "70",
                }}
              >
                Supplier Contact Number : 6010px34567890
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
                  }}
                >
                  E-INVOICE
                </Text>

                <Text
                  style={{
                    color: "black",
                    fontSize: "10px",
                    marginBottom: "10px",
                    fontWeight: "normal",
                    opacity: "70",
                  }}
                >
                  e-Invoice Type : 01-invoice
                </Text>

                <Text
                  style={{
                    color: "black",
                    fontSize: "10px",
                    marginBottom: "10px",
                    fontWeight: "normal",
                    opacity: "70",
                  }}
                >
                  e-Invoice code : INV10px345
                </Text>

                <Text
                  style={{
                    color: "black",
                    fontSize: "10px",
                    marginBottom: "10px",
                    fontWeight: "bold",
                    opacity: "70",
                  }}
                >
                  UUID : 0VG95YXFXBCGSHANREF919DJ10
                </Text>

                <Text
                  style={{
                    color: "black",
                    fontSize: "10px",
                    marginBottom: "10px",
                    fontWeight: "normal",
                    opacity: "70",
                  }}
                >

                   Issuance Date 20/11/2024 9:00 PM (MYT)
                </Text>

                <Text
                  style={{
                    color: "black",
                    fontSize: "10px",
                    marginBottom: "10px",
                    fontWeight: "normal",
                    opacity: "70",
                  }}
                >

                  Currency Code: RM
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
              }}
            >
              Buyer TIN : E100000000010
            </Text>

            <Text
              style={{
                color: "black",
                fontSize: "10px",
                marginBottom: "10px",
                fontWeight: "bold",
                opacity: "70",
              }}
            >
              Buyer Name : john doe
            </Text>

            <Text
              style={{
                color: "black",
                fontSize: "10px",
                marginBottom: "10px",
                fontWeight: "normal",
                opacity: "70",
              }}
            >
              Buyer Identification Number : 790456098765
            </Text>

            <Text
              style={{
                color: "black",
                fontSize: "10px",
                marginBottom: "10px",
                fontWeight: "normal",
                opacity: "70",
              }}
            >
              Supplier MSIC code: 79110
            </Text>

            <Text
              style={{
                color: "black",
                fontSize: "10px",
                marginBottom: "10px",
                fontWeight: "normal",
                opacity: "70",
                width: "70%",
              }}
            >
              Buyer Address : 6 Tingkast 2 Jaya , 40173 selangor Malaysia
            </Text>

            <Text
              style={{
                color: "black",
                fontSize: "10px",
                marginBottom: "10px",
                fontWeight: "normal",
                opacity: "70",
              }}
            >
              Buyer Contact Number : 601234567890
            </Text>
          </div>

          {/* Table */}

          {/* Table */}

          {/* Second Page */}
          <div style={{ marginTop: "50px" }}>
            {/* Table */}
            <View style={styles.table}>
              {/* Table Header */}
              {renderRow(
                [
                  "Classification Code",
                  "Description of Service",
                  "Subtotal",
                  "Tax Amount",
                  "Discount Amount",
                  "Total Amount",
                ],
                true
              )}

              {/* Table Body */}
              {data.map((row, index) => renderRow(row))}

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
                  }}
                >
                  Date and Time of validation : 12/06/2024 12:58:13
                </Text>
              </div>

              <div style={{display: "flex", alignItems: "flex-end",justifyContent: "flex-end",width:'100%',height:'100%'}}>
              <QR url={validationLink} width={128} foreground="#000" background="#fff" />
            
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
