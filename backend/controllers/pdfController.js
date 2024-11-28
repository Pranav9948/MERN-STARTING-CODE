const axios = require("axios");
var colors = require("colors");

function convertUblToJson(ublJson) {
  try {
    return JSON.parse(ublJson);
  } catch (error) {
    throw new Error(`Failed to parse UBL JSON: ${error.message}`);
  }
}

function simplifyUblJson(ublJson) {
  function simplifyValue(value) {
    if (Array.isArray(value)) {
      return value.map((item) => simplifyValue(item));
    } else if (typeof value === "object" && value !== null) {
      if ("_" in value) {
        return value._;
      } else {
        return Object.fromEntries(
          Object.entries(value).map(([key, val]) => [key, simplifyValue(val)])
        );
      }
    }

    return value;
  }

 
  return simplifyValue(ublJson);
}

function convertUBLJsonToPlain(ublJson) {
  function flattenObject(obj) {
    const result = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (Array.isArray(obj[key])) {
          if (obj[key].length === 1 && obj[key][0]._ !== undefined) {
            result[key] = obj[key][0]._;
          } else {
            result[key] = obj[key].map((item) => flattenObject(item));
          }
        } else if (typeof obj[key] === "object") {
          result[key] = flattenObject(obj[key]);
        } else {
          result[key] = obj[key];
        }
      }
    }

    return result;
  }

  return flattenObject(ublJson);
}

exports.getPdfData = async (req, res) => {
  const { authorizationtoken } = req.headers;
  const { UUID } = req.body;



  try {
    const { data } = await axios.get(
      `https://preprod-api.myinvois.hasil.gov.my/api/v1.0/documents/${UUID}/raw`, //add correct baseurl here

      {
        headers: {
          Authorization: `Bearer ${authorizationtoken}`,
          Accept: "application/json",
          "Accept-Language": "en",
          "Content-Type": "application/json",
        },
      }
    );

    const {
      uuid,
      submissionUid,
      longID,
      internalId,
      typeName,
      typeVersionName,
      issuerTin,
      issuerName,
      receiverId,
      receiverName,
      dateTimeReceived,
      dateTimeValidated,
      status,
      documentStatusReason,
      cancelDateTime,
      rejectRequestDateTime,
      document,
    } = data;

    const jsonData = convertUblToJson(document);

    const simplifiedJson = simplifyUblJson(JSON.stringify(jsonData, null, 2));

    const plainJsonData = convertUBLJsonToPlain(jsonData);

   

    const responseData = {
      plainJsonData,
      uuid,
      submissionUid,
      longID,
      internalId,
      typeName,
      typeVersionName,
      issuerTin,
      issuerName,
      receiverId,
      receiverName,
      dateTimeReceived,
      dateTimeValidated,
      status,
      documentStatusReason,
      cancelDateTime,
      rejectRequestDateTime,
    };

    res.status(200).json(responseData);
  } catch (error) {
    // Handle errors and return response
    console.log(
      "error occured".red,
      error?.response?.data?.error,
      error?.status
    );

    res
      .status(500)
      .send({ error: error?.response?.data?.error, status: error?.status });
  }
};
