import { spawn } from "child_process";
import http from "http";
import { promisify } from "util";

const sleep = promisify(setTimeout);

async function waitForServer(url: string, maxAttempts = 30): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      await new Promise<void>((resolve, reject) => {
        const req = http.get(url, (res) => {
          if (res.statusCode === 200) {
            resolve();
          } else {
            reject(new Error(`Status code: ${res.statusCode}`));
          }
        });
        req.on("error", reject);
      });
      console.log("Server is ready!");
      return true;
    } catch {
      console.log(`Waiting for server to start... (${i + 1}/${maxAttempts})`);
      await sleep(1000);
    }
  }
  throw new Error("Server failed to start within the timeout period");
}

async function main(): Promise<void> {
  console.log("Starting Next.js server...");
  const nextProcess = spawn("pnpm", ["--filter", "tile-extruder-web-app", "start"], {
    stdio: "inherit",
  });

  try {
    await waitForServer("http://localhost:3000");

    console.log("Running Cypress...");
    const cypressProcess = spawn(
      "pnpm",
      [
        "--filter",
        "tile-extruder-web-app",
        "exec",
        "cypress",
        "run",
        "--browser",
        "chrome",
        "--headless",
      ],
      {
        stdio: "inherit",
        shell: true,
      }
    );

    await new Promise<void>((resolve, reject) => {
      cypressProcess.on("close", (code) => {
        if (code === 0) {
          console.log("Cypress tests completed successfully");
          resolve();
        } else {
          reject(new Error(`Cypress exited with code ${code}`));
        }
      });
    });
  } finally {
    nextProcess.kill();
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
