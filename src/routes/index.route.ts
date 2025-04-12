import { Router } from "express";
import axios from "axios";
import { config } from "../config";

const router = Router();

router.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

// ===============================
// Persona Engine API
router.get("/persona-engine/update/:address", async (req, res) => {
  const { address } = req.params;
  try {
    const { data } = await axios.get(
      `${config.personaEngineUrl}/update/${address}`
    );
    res.json(data);
  } catch (err: any) {
    res.status(502).json({ error: "Failed to reach persona-engine (update)" });
  }
});

// persona-engine 캐시 분석
router.get("/persona-engine/wallet/:address", async (req, res) => {
  const { address } = req.params;
  try {
    const { data } = await axios.get(
      `${config.personaEngineUrl}/wallet/${address}`
    );
    res.json(data);
  } catch (err: any) {
    res.status(502).json({ error: "Failed to reach persona-engine (wallet)" });
  }
});

// // 페르소나 그룹별 가장 많이 상호작용한 컨트랙트 조회
// router.get("/persona-engine/category/:group", async (req, res) => {
//   const { group } = req.params;
//   const { limit } = req.query;

//   try {
//     const url = `${config.personaEngineUrl}/category/${group}`;
//     const { data } = await axios.get(url, {
//       params: { limit },
//     });
//     res.json(data);
//   } catch (err: any) {
//     console.error("[GW:persona-engine/category]", err.message);
//     res
//       .status(502)
//       .json({ error: "Failed to reach persona-engine (category)" });
//   }
// });

// persona-engine 캐시 분석
router.get("/persona-engine/logs/:address", async (req, res) => {
  const { address } = req.params;
  try {
    const { data } = await axios.get(
      `${config.personaEngineUrl}/logs/${address}`
    );
    res.json(data);
  } catch (err: any) {
    res.status(502).json({ error: "Failed to reach persona-engine (wallet)" });
  }
});

// 페르소나 그룹별 가장 많이 상호작용한 컨트랙트 조회
router.get("/persona-engine/category/:group", async (req, res) => {
  const { group } = req.params;
  const { limit, address } = req.query;
  try {
    let url = `${config.personaEngineUrl}/category/${group}`;

    if (limit || address) {
      url += "?";
      if (limit) url += `limit=${limit}`;
      if (limit && address) url += "&";
      if (address) url += `address=${address}`;
    }

    const { data } = await axios.get(url);
    res.json(data);
  } catch (err: any) {
    res.status(502).json({ error: "Failed to reach persona-engine (wallet)" });
  }
});

// ===============================
// User Module API
// ===============================
// 유저 조회
router.get("/user/:address", async (req, res) => {
  try {
    const { data } = await axios.get(
      `${config.userModuleUrl}/${req.params.address}`
    );
    res.json(data);
  } catch (err: any) {
    console.error("[GW:user/:address]", err.message);
    res.status(502).json({ success: false, message: "User module 연결 실패" });
  }
});

// 회원가입
router.post("/user/signup", async (req, res) => {
  try {
    const { data } = await axios.post(
      `${config.userModuleUrl}/signup`,
      req.body
    );
    res.status(201).json(data);
  } catch (err: any) {
    console.error("[GW:user/signup]", err.message);
    res.status(502).json({ success: false, message: "User module 연결 실패" });
  }
});

// 이메일 등록
router.post("/user/email/:address", async (req, res) => {
  try {
    const { data } = await axios.post(
      `${config.userModuleUrl}/email/${req.params.address}`,
      req.body
    );
    res.json(data);
  } catch (err: any) {
    console.error("[GW:user/email]", err.message);
    res.status(502).json({ success: false, message: "User module 연결 실패" });
  }
});

// 텔레그램 등록
router.post("/user/telegram/:address", async (req, res) => {
  try {
    const { data } = await axios.post(
      `${config.userModuleUrl}/telegram/${req.params.address}`,
      req.body
    );
    res.json(data);
  } catch (err: any) {
    console.error("[GW:user/telegram]", err.message);
    res.status(502).json({ success: false, message: "User module 연결 실패" });
  }
});

// ===============================
// Tx Agent API
// ===============================
router.get("/tx-agent/agent", async (req, res) => {
  try {
    const { data } = await axios.get(`${config.txAgentModuleUrl}/agent`);
    res.json(data);
  } catch (err: any) {
    console.error("[GW:tx-agent/agent]", err.message);
    res.status(502).json({ error: "Failed to reach tx-agent (agent)" });
  }
});

router.post("/tx-agent/createAccount", async (req, res) => {
  try {
    const { data } = await axios.post(
      `${config.txAgentModuleUrl}/createAccount`,
      req.body
    );
    res.status(201).json(data);
  } catch (err: any) {
    console.error("[GW:tx-agent/createAccount]", err.message);
    res.status(502).json({ error: "Failed to reach tx-agent (createAccount)" });
  }
});

router.post("/tx-agent/executeTransaction", async (req, res) => {
  try {
    const { data } = await axios.post(
      `${config.txAgentModuleUrl}/executeTransaction`,
      req.body
    );
    res.json(data);
  } catch (err: any) {
    console.error("[GW:tx-agent/executeTransaction]", err.message);
    res
      .status(502)
      .json({ error: "Failed to reach tx-agent (executeTransaction)" });
  }
});

router.post("/tx-agent/createAgentRule", async (req, res) => {
  try {
    const { data } = await axios.post(
      `${config.txAgentModuleUrl}/createAgentRule`,
      req.body
    );
    res.status(201).json(data);
  } catch (err: any) {
    console.error("[GW:tx-agent/createAgentRule]", err.message);
    res
      .status(502)
      .json({ error: "Failed to reach tx-agent (createAgentRule)" });
  }
});

router.get("/tx-agent/getRules/:address", async (req, res) => {
  try {
    const { data } = await axios.get(
      `${config.txAgentModuleUrl}/getRules/${req.params.address}`
    );
    res.json(data);
  } catch (err: any) {
    console.error("[GW:tx-agent/getRules]", err.message);
    res.status(502).json({ error: "Failed to reach tx-agent (getRules)" });
  }
});

export default router;
