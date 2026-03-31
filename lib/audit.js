import { prisma } from "./prisma";

/**
 * Log a compliance event to the audit log.
 * @param {string} orgId
 * @param {string} eventType
 * @param {object} payload
 */
export async function logEvent(orgId, eventType, payload) {
  await prisma.auditLog.create({
    data: {
      orgId,
      eventType,
      payload,
    },
  });
}
