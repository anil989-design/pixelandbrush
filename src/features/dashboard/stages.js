/** Build-stage definitions for the client timeline. */
export const STAGE_ORDER = ["Discovery", "Design", "Development", "Testing", "Launch"];

const STAGE_DESCRIPTIONS = {
  Discovery: "Requirements gathering & brief confirmed",
  Design: "Main layout & brand direction approved",
  Development: "Website build actively in progress",
  Testing: "Final QA checks and revisions",
  Launch: "Deployment & go-live",
};

/** @returns {{title: string, desc: string, status: "done"|"active"|"pending"}[]} */
export function buildStages(currentStage) {
  const currentIndex = STAGE_ORDER.indexOf(currentStage);
  return STAGE_ORDER.map((title, index) => ({
    title,
    desc: STAGE_DESCRIPTIONS[title],
    status: index < currentIndex ? "done" : index === currentIndex ? "active" : "pending",
  }));
}
