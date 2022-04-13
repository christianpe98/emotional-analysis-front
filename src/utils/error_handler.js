import { ERROR_MESSAGES } from "./error_messages.js";

export const ERROR_SCOPES = {
  GENERAL_SCOPE: "general",
  HOME_SCOPE: "home",
};

export const getErrorMessage = (scope, code) => {
  if (scope === ERROR_SCOPES.GENERAL_SCOPE)
    return ERROR_MESSAGES[ERROR_SCOPES.GENERAL_SCOPE]["default"];
  if (!code) return ERROR_MESSAGES[scope]["default"];
  return ERROR_MESSAGES[scope][code];
};
