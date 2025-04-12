import { Router } from 'express';
import axios from 'axios';
import { config } from '../config';

const router = Router();

router.get('/ping', (req, res) => {
    res.status(200).json({ message: 'pong' });
    });

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

export default router;
