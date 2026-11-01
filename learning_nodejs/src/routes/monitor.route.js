import express from 'express';
import os from 'node:os';
import v8 from 'node:v8';
import { logger } from '../utils/logger.util.js';
import { randomKeyGenerator } from '../utils/cache.util.js';

const router = express.Router();

const toMB = (bytes) => +(bytes / 1024 / 1024).toFixed(2);

let prevCpu = process.cpuUsage();
let prevTime = process.hrtime.bigint();

router.get('/', function(req, res) {
  const mem = process.memoryUsage();
  const heap = v8.getHeapStatistics();
  const nowCpu = process.cpuUsage();
  const nowTime = process.hrtime.bigint();

  const userDiff = nowCpu.user - prevCpu.user;       
  const systemDiff = nowCpu.system - prevCpu.system; 
  const elapsedNs = Number(nowTime - prevTime);     
  const elapsedUs = elapsedNs / 1000;               

  prevCpu = nowCpu;
  prevTime = nowTime;

  if (elapsedUs <= 0) {
    return { user: 0, system: 0, total: 0, perCore: 0 };
  }

  const userPercent = (userDiff / elapsedUs) * 100;
  const systemPercent = (systemDiff / elapsedUs) * 100;
  const totalPercent = userPercent + systemPercent;
  const cores = os.cpus().length || 1;

  const info = {
    process: {
      rssMB: toMB(mem.rss),
      heapTotalMB: toMB(mem.heapTotal),
      heapUsedMB: toMB(mem.heapUsed),
      externalMB: toMB(mem.external),
      arrayBuffersMB: toMB(mem.arrayBuffers),
      heapSizeLimitMB: toMB(heap.heap_size_limit)
    },
    system: {
      totalMB: toMB(os.totalmem()),
      freeMB: toMB(os.freemem()),
      usedPercent: +(
        ((os.totalmem() - os.freemem()) / os.totalmem()) * 100
      ).toFixed(2)
    },
    os: {
      platform: os.platform(),
      arch: os.arch(),
      cpuCount: os.cpus().length,
      loadavg: os.loadavg(),
      uptimeSec: os.uptime()
    },
    cup: {
      user: +userPercent.toFixed(2) + '%',
      system: +systemPercent.toFixed(2) + '%',
      total: +totalPercent.toFixed(2) + '%',
      perCore: +(totalPercent / cores).toFixed(2) + '%'
    }
  };
  res.status(200).json(info);
});

router.get('/health', function(req, res) {
    const checks = {};
    try {
      // await DB.raw('SELECT 1');
      checks.mysql = 'ok';
    } catch (e) {
      checks.mysql = 'fail';
    }
    try {
      // await RDB.ping();
      checks.redis = 'ok';
    } catch (e) {
      checks.redis = 'fail';
    }

  const allOk = Object.values(checks).every((v) => v === 'ok');
  res.status(allOk ? 200 : 503).json({ status: allOk ? 'ok' : 'degraded', checks });
  res.status(200).end()
});

router.get('/live', (req, res) => {
  res.json({ status: 'ok', 
             uptime: process.uptime(), 
             timestamp: new Date().toISOString()});
});

export default router;
