/* eslint-disable prefer-arrow-callback */
/* eslint-disable promise/always-return */
"use strict";

const axios = require("axios");
const api = axios.create({
  baseURL: "https://brazilsouth.api.cognitive.microsoft.com",
  headers: {
    "Ocp-Apim-Subscription-Key": "cfe6f6165e2e4f0785d5f58300780130",
  },
  params: {
    detectionModel: "detection_02",
    returnFaceId: true,
  },
});

const getId = async (foto) => {
    const aux = "https://firebasestorage.googleapis.com/v0/b/rumi-acdfa.appspot.com/o/" + foto + "?alt=media";
  const body = {
    url: aux  };
  return await api.post("/face/v1.0/detect", body);
};

const verifyUsers = async (dni, user) => {
  const body = {
    faceId1: dni,
    faceId2: user,
  };
  return await api.post("/face/v1.0/verify", body);
};

module.exports = { getId, verifyUsers };
