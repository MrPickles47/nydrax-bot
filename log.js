export function logInfo(message) {
  console.log(`ℹ️ INFO: ${message}`);
}

export function logError(message) {
  console.error(`❌ ERROR: ${message}`);
}

export function logUser(userId, message) {
  console.log(`👤 USER ${userId}: ${message}`);
}
