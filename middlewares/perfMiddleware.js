import { performance } from 'node:perf_hooks'
// const performance = require('perf_hooks').performance;

function performanceMonitor() {
  const marks = new Map();
  
  return {
    // 标记开始
    markStart: (name) => {
      marks.set(name, performance.now());
    },
    
    // 标记结束并记录
    markEnd: (name) => {
      const start = marks.get(name);
      if (!start) return null;
      
      const duration = performance.now() - start;
      marks.delete(name);
      
      // 记录到监控系统
      console.log(`性能标记 ${name}: ${duration.toFixed(2)}ms`);
      
      return duration;
    },
    
    // 中间件包装器
    middleware: (req, res, next) => {
      performance.mark('request-start');
      
      req.performance = {
        mark: (name) => performance.mark(name),
        measure: (name, startMark, endMark) => {
          performance.measure(name, startMark, endMark);
          const entry = performance.getEntriesByName(name)[0];
          return entry ? entry.duration : null;
        }
      };
      
      const originalEnd = res.end;
      res.end = function(...args) {
        performance.mark('request-end');
        performance.measure('request-total', 'request-start', 'request-end');
        
        const totalEntry = performance.getEntriesByName('request-total')[0];
        if (totalEntry) {
          console.log(`请求总耗时: ${totalEntry.duration.toFixed(2)}ms`);
          
          // 可以发送到监控系统
          // monitor.send('request.duration', totalEntry.duration, {
          //   method: req.method,
          //   path: req.path,
          //   status: res.statusCode
          // });
        }
        
        performance.clearMarks();
        performance.clearMeasures();
        
        originalEnd.apply(this, args);
      };
      
      next();
    }
  };
}