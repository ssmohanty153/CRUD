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
const createWorker = () => {
    const worker = cluster.fork();
    worker.on('exit', () => {
        console.log(`Worker ${worker.process.pid} died`);
        createWorker();
    });
};

// Start the application in master or worker mode
if (cluster.isMaster) {
    // Create workers based on the number of CPU cores minus 1 (to leave one core for the master process)
    const numWorkers = os.cpus().length - 1;
    for (let i = 0; i < numWorkers; i++) {
        createWorker();
    }
} else {
    // In each worker process, establish database connection and start the application
    connectDB()
        .then(() => {
            app.on('error', (error) => {
                console.error('Error', error);
                throw error;
            });
            app.listen(process.env.PORT || 3000, () => {
                console.log(`Worker ${process.pid} is running at Port : ${process.env.PORT}`);
            });
        })
        .catch((error) => {
            console.log(`Worker ${process.pid} failed to connect to MongoDB!!!`, error);
        });
}
