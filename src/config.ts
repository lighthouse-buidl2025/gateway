import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 8000,
  personaEngineUrl: process.env.PERSONA_ENGINE_URL!,
  userModuleUrl: process.env.USER_MODEL_URL!,
  txAgentModuleUrl: process.env.TX_AGENT_URL!,
  envInfo: process.env.ENV_INFO_URL!,
  elizaAgentUrl: process.env.ELIZA_AGENT_URL!,
};
