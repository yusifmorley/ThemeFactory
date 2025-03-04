import type { Sequelize } from "sequelize";
import { jump_to_theme as _jump_to_theme } from "./jump_to_theme";
import type { jump_to_themeAttributes, jump_to_themeCreationAttributes } from "./jump_to_theme";
import { theme_editor_log as _theme_editor_log } from "./theme_editor_log";
import type { theme_editor_logAttributes, theme_editor_logCreationAttributes } from "./theme_editor_log";

export {
  _jump_to_theme as jump_to_theme,
  _theme_editor_log as theme_editor_log,
};

export type {
  jump_to_themeAttributes,
  jump_to_themeCreationAttributes,
  theme_editor_logAttributes,
  theme_editor_logCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const jump_to_theme = _jump_to_theme.initModel(sequelize);
  const theme_editor_log = _theme_editor_log.initModel(sequelize);


  return {
    jump_to_theme: jump_to_theme,
    theme_editor_log: theme_editor_log,
  };
}
