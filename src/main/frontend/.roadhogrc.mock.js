import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { imgMap } from './mock/utils';
import { getNotices } from './mock/notices';
import { delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = mockjs.mock({
  // 支持值为 Object 和 Array
  'POST /api/dashboard': {
    data: {
      getClusterBrief: {
        'numOfApplication|1-100': 1,
        'numOfService|1-100': 1,
        'numOfDatabase|1-100': 1,
        'numOfCache|1-100': 1,
        'numOfMQ|1-100': 1,
      },
      getAlarmTrend: {
        'numOfAlarmRate|5': [5, 3, 2,],
      },
      getConjecturalApps: {
        'apps|3-5': [{'name|1':['Oracle', 'MySQL', 'ActiveMQ', 'Redis', 'Memcache', 'SQLServer'], 'num|1-20':10}],
      },
      'getTopNSlowService|10': [{'key|+1': 1, 'name': '@name', 'avgResponseTime|200-1000': 1}],
      'getTopNServerThroughput|10': [{'key|+1': 1, 'name': '@name', 'tps|100-10000': 1}],
    }
  },
});

export default noProxy ? {} : delay(proxy, 1000);