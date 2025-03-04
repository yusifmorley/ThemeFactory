import type { Sequelize } from "sequelize";
import { theme_editor_log as _theme_editor_log } from "./theme_editor_log";
import type { theme_editor_logAttributes, theme_editor_logCreationAttributes } from "./theme_editor_log";

export {
  _theme_editor_log as theme_editor_log,
};

export type {
  theme_editor_logAttributes,
  theme_editor_logCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const theme_editor_log = _theme_editor_log.initModel(sequelize);


  return {
    theme_editor_log: theme_editor_log,
  };
}
