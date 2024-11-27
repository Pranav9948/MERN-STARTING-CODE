/**
 * Converts UBL JSON string into a JavaScript object.
 * @param {string} ublJson - The UBL data in JSON string format.
 * @returns {object} - The JavaScript object representation of the UBL data.
 */
function convertUblToJson(ublJson) {
    try {
        return JSON.parse(ublJson);
    } catch (error) {
        throw new Error(`Failed to parse UBL JSON: ${error.message}`);
    }
}

function simplifyUblJson(ublJson) {
    function simplifyValue(value) {
        // If the value is an object or array, simplify recursively
        if (Array.isArray(value)) {
            return value.map(item => simplifyValue(item));
        } else if (typeof value === 'object' && value !== null) {
            if ('_' in value) {
                // Extract `_` property as the main value if it exists
                return value._;
            } else {
                // Simplify nested objects
                return Object.fromEntries(
                    Object.entries(value).map(([key, val]) => [key, simplifyValue(val)])
                );
            }
        }
        // For primitive values, return as-is
        return value;
    }

    // Simplify the root object
    return simplifyValue(ublJson);
}


function convertUBLJsonToPlain(ublJson) {
    function flattenObject(obj) {
      const result = {};
  
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          // Check if the property is an array and has an object with `_` inside
          if (Array.isArray(obj[key])) {
            if (obj[key].length === 1 && obj[key][0]._ !== undefined) {
              // Extract the value inside the `_` field if present
              result[key] = obj[key][0]._;
            } else {
              // Otherwise, recurse into the array's objects
              result[key] = obj[key].map(item => flattenObject(item));
            }
          } else if (typeof obj[key] === 'object') {
            // Recurse into nested objects
            result[key] = flattenObject(obj[key]);
          } else {
            // Assign simple key-value pair
            result[key] = obj[key];
          }
        }
      }
  
      return result;
    }
  
    return flattenObject(ublJson);
  }
  




const ublJson = "{\"_D\":\"urn:oasis:names:specification:ubl:schema:xsd:Invoice-2\",\"_A\":\"urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2\",\"_B\":\"urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2\",\"Invoice\":[{\"ID\":[{\"_\":\"INV12345\"}],\"IssueDate\":[{\"_\":\"2024-11-20\"}],\"IssueTime\":[{\"_\":\"15:30:00Z\"}],\"InvoiceTypeCode\":[{\"_\":\"01\",\"listVersionID\":\"1.0\"}],\"DocumentCurrencyCode\":[{\"_\":\"MYR\"}],\"TaxCurrencyCode\":[{\"_\":\"MYR\"}],\"AccountingSupplierParty\":[{\"Party\":[{\"IndustryClassificationCode\":[{\"_\":\"79110\",\"name\":\"Travel agency activities\"}],\"PartyIdentification\":[{\"ID\":[{\"_\":\"IG24357571080\",\"schemeID\":\"TIN\"}]},{\"ID\":[{\"_\":\"Z5713582\",\"schemeID\":\"PASSPORT\"}]}],\"PostalAddress\":[{\"CityName\":[{\"_\":\"Kuala Lumpur\"}],\"PostalZone\":[{\"_\":\"50480\"}],\"CountrySubentityCode\":[{\"_\":\"10\"}],\"AddressLine\":[{\"Line\":[{\"_\":\"Lot 66\"}]},{\"Line\":[{\"_\":\"Bangunan Merdeka\"}]},{\"Line\":[{\"_\":\"Persiaran Jaya\"}]}],\"Country\":[{\"IdentificationCode\":[{\"_\":\"MYS\",\"listID\":\"ISO3166-1\",\"listAgencyID\":\"6\"}]}]}],\"PartyLegalEntity\":[{\"RegistrationName\":[{\"_\":\"Globetrotter Getaways\"}]}],\"Contact\":[{\"Telephone\":[{\"_\":\"+91-7736228299\"}]}]}]}],\"AccountingCustomerParty\":[{\"Party\":[{\"PostalAddress\":[{\"CityName\":[{\"_\":\"Trivandrum\"}],\"CountrySubentityCode\":[{\"_\":\"17\"}],\"AddressLine\":[{\"Line\":[{\"_\":\"Pranavam\"}]},{\"Line\":[{\"_\":\"TC 9/618\"}]},{\"Line\":[{\"_\":\"Pariyamadom Lane\"}]},{\"Line\":[{\"_\":\"Kallampally, Sreekaryam\"}]}],\"Country\":[{\"IdentificationCode\":[{\"_\":\"IND\",\"listID\":\"ISO3166-1\",\"listAgencyID\":\"6\"}]}]}],\"PartyLegalEntity\":[{\"RegistrationName\":[{\"_\":\"John doe\"}]}],\"PartyIdentification\":[{\"ID\":[{\"_\":\"EI00000000020\",\"schemeID\":\"TIN\"}]},{\"ID\":[{\"_\":\"NA\",\"schemeID\":\"BRN\"}]},{\"ID\":[{\"_\":\"NA\",\"schemeID\":\"SST\"}]},{\"ID\":[{\"_\":\"NA\",\"schemeID\":\"TTX\"}]}],\"Contact\":[{\"Telephone\":[{\"_\":\"917736228299\"}]}]}]}],\"LegalMonetaryTotal\":[{\"LineExtensionAmount\":[{\"_\":9400,\"currencyID\":\"MYR\"}],\"TaxExclusiveAmount\":[{\"_\":9400,\"currencyID\":\"MYR\"}],\"TaxInclusiveAmount\":[{\"_\":14570,\"currencyID\":\"MYR\"}],\"PayableAmount\":[{\"_\":14570,\"currencyID\":\"MYR\"}]}],\"TaxTotal\":[{\"TaxAmount\":[{\"_\":5170,\"currencyID\":\"MYR\"}],\"TaxSubtotal\":[{\"TaxableAmount\":[{\"_\":5170,\"currencyID\":\"MYR\"}],\"TaxAmount\":[{\"_\":5170,\"currencyID\":\"MYR\"}],\"TaxCategory\":[{\"ID\":[{\"_\":\"01\"}],\"TaxScheme\":[{\"ID\":[{\"_\":\"OTH\",\"schemeID\":\"UN/ECE 5153\",\"schemeAgencyID\":\"6\"}]}]}]}]}],\"InvoiceLine\":[{\"ID\":[{\"_\":\"001\"}],\"InvoicedQuantity\":[{\"_\":1,\"unitCode\":\"IE\"}],\"LineExtensionAmount\":[{\"_\":6600,\"currencyID\":\"MYR\"}],\"TaxTotal\":[{\"TaxAmount\":[{\"_\":0,\"currencyID\":\"MYR\"}],\"TaxSubtotal\":[{\"TaxableAmount\":[{\"_\":0,\"currencyID\":\"MYR\"}],\"TaxAmount\":[{\"_\":0,\"currencyID\":\"MYR\"}],\"TaxCategory\":[{\"ID\":[{\"_\":\"03\"}],\"TaxScheme\":[{\"ID\":[{\"_\":\"OTH\",\"schemeID\":\"UN/ECE 5153\",\"schemeAgencyID\":\"6\"}]}]}]}]}],\"Item\":[{\"CommodityClassification\":[{\"ItemClassificationCode\":[{\"_\":\"008\",\"listID\":\"CLASS\"}]}],\"Description\":[{\"_\":\"Jungle Wildlife Safari \"}],\"OriginCountry\":[{\"IdentificationCode\":[{\"_\":\"MYS\"}]}]}],\"Price\":[{\"PriceAmount\":[{\"_\":6600,\"currencyID\":\"MYR\"}]}],\"ItemPriceExtension\":[{\"Amount\":[{\"_\":6600,\"currencyID\":\"MYR\"}]}]},{\"ID\":[{\"_\":\"002\"}],\"InvoicedQuantity\":[{\"_\":2,\"unitCode\":\"IE\"}],\"LineExtensionAmount\":[{\"_\":200,\"currencyID\":\"MYR\"}],\"TaxTotal\":[{\"TaxAmount\":[{\"_\":0,\"currencyID\":\"MYR\"}],\"TaxSubtotal\":[{\"TaxableAmount\":[{\"_\":0,\"currencyID\":\"MYR\"}],\"TaxAmount\":[{\"_\":0,\"currencyID\":\"MYR\"}],\"TaxCategory\":[{\"ID\":[{\"_\":\"03\"}],\"TaxScheme\":[{\"ID\":[{\"_\":\"OTH\",\"schemeID\":\"UN/ECE 5153\",\"schemeAgencyID\":\"6\"}]}]}]}]}],\"Item\":[{\"CommodityClassification\":[{\"ItemClassificationCode\":[{\"_\":\"008\",\"listID\":\"CLASS\"}]}],\"Description\":[{\"_\":\"boat transportation from Goa International Airport to undefined\"}],\"OriginCountry\":[{\"IdentificationCode\":[{\"_\":\"MYS\"}]}]}],\"Price\":[{\"PriceAmount\":[{\"_\":200,\"currencyID\":\"MYR\"}]}],\"ItemPriceExtension\":[{\"Amount\":[{\"_\":200,\"currencyID\":\"MYR\"}]}]},{\"ID\":[{\"_\":\"003\"}],\"InvoicedQuantity\":[{\"_\":2,\"unitCode\":\"IE\"}],\"LineExtensionAmount\":[{\"_\":400,\"currencyID\":\"MYR\"}],\"TaxTotal\":[{\"TaxAmount\":[{\"_\":0,\"currencyID\":\"MYR\"}],\"TaxSubtotal\":[{\"TaxableAmount\":[{\"_\":0,\"currencyID\":\"MYR\"}],\"TaxAmount\":[{\"_\":0,\"currencyID\":\"MYR\"}],\"TaxCategory\":[{\"ID\":[{\"_\":\"03\"}],\"TaxScheme\":[{\"ID\":[{\"_\":\"OTH\",\"schemeID\":\"UN/ECE 5153\",\"schemeAgencyID\":\"6\"}]}]}]}]}],\"Item\":[{\"CommodityClassification\":[{\"ItemClassificationCode\":[{\"_\":\"008\",\"listID\":\"CLASS\"}]}],\"Description\":[{\"_\":\"land transportation from calangutte Beach to undefined\"}],\"OriginCountry\":[{\"IdentificationCode\":[{\"_\":\"MYS\"}]}]}],\"Price\":[{\"PriceAmount\":[{\"_\":400,\"currencyID\":\"MYR\"}]}],\"ItemPriceExtension\":[{\"Amount\":[{\"_\":400,\"currencyID\":\"MYR\"}]}]},{\"ID\":[{\"_\":\"004\"}],\"InvoicedQuantity\":[{\"_\":1,\"unitCode\":\"IE\"}],\"LineExtensionAmount\":[{\"_\":2200,\"currencyID\":\"MYR\"}],\"TaxTotal\":[{\"TaxAmount\":[{\"_\":0,\"currencyID\":\"MYR\"}],\"TaxSubtotal\":[{\"TaxableAmount\":[{\"_\":0,\"currencyID\":\"MYR\"}],\"TaxAmount\":[{\"_\":0,\"currencyID\":\"MYR\"}],\"TaxCategory\":[{\"ID\":[{\"_\":\"03\"}],\"TaxScheme\":[{\"ID\":[{\"_\":\"OTH\",\"schemeID\":\"UN/ECE 5153\",\"schemeAgencyID\":\"6\"}]}]}]}]}],\"Item\":[{\"CommodityClassification\":[{\"ItemClassificationCode\":[{\"_\":\"008\",\"listID\":\"CLASS\"}]}],\"Description\":[{\"_\":\"Ocean View Deluxe Room\"}],\"OriginCountry\":[{\"IdentificationCode\":[{\"_\":\"MYS\"}]}]}],\"Price\":[{\"PriceAmount\":[{\"_\":2200,\"currencyID\":\"MYR\"}]}],\"ItemPriceExtension\":[{\"Amount\":[{\"_\":2200,\"currencyID\":\"MYR\"}]}]}],\"Signature\":[{\"ID\":[{\"_\":\"urn:oasis:names:specification:ubl:signature:Invoice\"}],\"SignatureMethod\":[{\"_\":\"urn:oasis:names:specification:ubl:dsig:enveloped:xades\"}]}]}]}"

try {
    const jsonData = convertUblToJson(ublJson);
   
    const simplifiedJson = simplifyUblJson(JSON.stringify(jsonData, null, 2));

    const plainJsonData= convertUBLJsonToPlain(jsonData)

    // console.log('simple',simplifiedJson);
    // console.log('plain',plainJsonData);
    

    console.log('jsonDta',JSON.stringify(plainJsonData, null, 2))



   
} catch (error) {
    console.error('Error converting UBL JSON:', error.message);
}
