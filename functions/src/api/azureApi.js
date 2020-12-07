/* eslint-disable prefer-arrow-callback */
/* eslint-disable promise/always-return */
"use strict";

const axios = require("axios");
const api = axios.create({
  baseURL: "https://brazilsouth.api.cognitive.microsoft.com",
  headers: {
    "Ocp-Apim-Subscription-Key": "ab20148fb64347fbb62ced77353399fd",
  },
  params: {
    detectionModel: "detection_02",
    returnFaceId: true,
  },
});

const getId =  (foto) => {
    const aux = "https://firebasestorage.googleapis.com/v0/b/rumi-acdfa.appspot.com/o/validate%2Fdni%2F" + foto + "?alt=media";
  const body = {
    url: aux  };
  return api.post("/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_03&returnRecognitionModel=false&detectionModel=detection_02", body);
};

const verifyUsers = (dni, user) => {
  const body = {
    faceId1: dni,
    faceId2: user,
  };
  return api.post("/face/v1.0/verify", body);
};

module.exports = { getId, verifyUsers };
