import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 8000,
  personaEngineUrl: process.env.PERSONA_ENGINE_URL!,
};
