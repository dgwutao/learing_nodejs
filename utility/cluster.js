import cluster from 'node:cluster';
import http from 'node:http';
import os from 'node:os'
const numCPUs = os.cpus().length; // 获取CPU核心数

if (cluster.isMaster) {
    console.log(`主进程 ${process.pid} 正在运行`);

    // 根据CPU核心数衍生工作进程
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork(); // 衍生一个新的工作进程
    }

    // 监听工作进程退出事件，并自动重启（提高容错）
    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出，代码: ${code}, 信号: ${signal}`);
        console.log('正在启动新的工作进程...');
        cluster.fork();
    });

} else {
    // 工作进程可以共享同一个端口（如3000）
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`你好，来自工作进程 ${process.pid}\n`);
    }).listen(3000);

    console.log(`工作进程 ${process.pid} 已启动`);
}