// start-cluster.js

import cluster from 'cluster';
import os from 'os';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({
    path: './.env'
});

// Function to create worker processes
const createWorker = (port) => {
    const worker = cluster.fork({ PORT: port });
    worker.on('exit', () => {
        console.log(`Worker ${worker.process.pid} died`);
        createWorker(port); // Restart the worker if it exits
    });
};

// Start the application in master or worker mode
if (cluster.isMaster) {
    // Create workers based on the number of CPU cores minus 1 (to leave one core for the master process)
    const numWorkers = os.cpus().length - 1;
    let port = parseInt(process.env.PORT) || 4001; // Starting port number
    for (let i = 0; i < numWorkers; i++) {
        createWorker(port + i); // Create worker processes with unique ports
    }
    // Load balancer listening on port 4000
    app.listen(4000, () => {
        console.log('Load balancer is listening on port 4000');
    });
} else {
    // In each worker process, establish database connection and start the application
    connectDB()
        .then(() => {
            app.on('error', (error) => {
                console.error('Error', error);
                throw error;
            });
            const workerPort = process.env.PORT || 4001;
            app.listen(workerPort, () => {
                console.log(`Worker ${process.pid} is running at Port : ${workerPort}`);
            });
        })
        .catch((error) => {
            console.log(`Worker ${process.pid} failed to connect to MongoDB!!!`, error);
        });
}
