import { Router } from 'express';
import axios from 'axios';
import { config } from '../config';

const router = Router();

router.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

// ===============================
// Persona Engine API
// ===============================

// persona-engine 사용자 조회
router.get('/persona-engine/update/:address', async (req, res) => {
  const { address } = req.params;
  try {
    const { data } = await axios.get(`${config.personaEngineUrl}/update/${address}`);
    res.json(data);
  } catch (err: any) {
    res.status(502).json({ error: 'Failed to reach persona-engine (update)' });
  }
});

// persona-engine 캐시 분석
router.get('/persona-engine/wallet/:address', async (req, res) => {
  const { address } = req.params;
  try {
    const { data } = await axios.get(`${config.personaEngineUrl}/wallet/${address}`);
    res.json(data);
  } catch (err: any) {
    res.status(502).json({ error: 'Failed to reach persona-engine (wallet)' });
  }
});

// 페르소나 그룹별 가장 많이 상호작용한 컨트랙트 조회
router.get('/persona-engine/category/:group', async (req, res) => {
  const { group } = req.params;
  const { limit } = req.query;

  try {
    const url = `${config.personaEngineUrl}/category/${group}`;
    const { data } = await axios.get(url, {
      params: { limit },
    });
    res.json(data);
  } catch (err: any) {
    console.error('[GW:persona-engine/category]', err.message);
    res.status(502).json({ error: 'Failed to reach persona-engine (category)' });
  }
});

// ===============================
// User Module API
// ===============================
// 유저 조회
router.get('/user/:address', async (req, res) => {
  try {
    const { data } = await axios.get(`${config.userModuleUrl}/${req.params.address}`);
    res.json(data);
  } catch (err: any) {
    if (err.response && err.response.status === 404) {
      res.status(404).json({ success: false, message: 'User not found' });
    }
    console.error('[GW:user/:address]', err.message);
    res.status(502).json({ success: false, message: 'User module 연결 실패' });
  }
});

// 회원가입
router.post('/user/signup', async (req, res) => {
  try {
    const { data } = await axios.post(`${config.userModuleUrl}/signup`, req.body);
    res.status(201).json(data);
  } catch (err: any) {
    console.error('[GW:user/signup]', err.message);
    res.status(502).json({ success: false, message: 'User module 연결 실패' });
  }
});

// 이메일 등록
router.post('/user/email/:address', async (req, res) => {
  try {
    const { data } = await axios.post(
      `${config.userModuleUrl}/email/${req.params.address}`,
      req.body
    );
    res.json(data);
  } catch (err: any) {
    console.error('[GW:user/email]', err.message);
    res.status(502).json({ success: false, message: 'User module 연결 실패' });
  }
});

// 텔레그램 등록
router.post('/user/telegram/:address', async (req, res) => {
  try {
    const { data } = await axios.post(
      `${config.userModuleUrl}/telegram/${req.params.address}`,
      req.body
    );
    res.json(data);
  } catch (err: any) {
    console.error('[GW:user/telegram]', err.message);
    res.status(502).json({ success: false, message: 'User module 연결 실패' });
  }
});

export default router;