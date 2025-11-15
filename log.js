import fs from "fs";
import path from "path";

export function logInfo(message) {
  write("INFO", message);
}

export function logError(message) {
  write("ERROR", message);
}

export function logUser(chatId, text) {
  write("USER", `ChatID: ${chatId} → ${text}`);
}

function write(type, message) {
  const logLine = `[${new Date().toISOString()}] [${type}] ${message}\n`;
  const logFile = path.resolve("nydrax.log");

  fs.appendFileSync(logFile, logLine);
}
