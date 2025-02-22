import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface theme_editor_logAttributes {
  kind?: number;
  ip?: string;
  date?: Date;
}

export type theme_editor_logOptionalAttributes = "kind" | "ip" | "date";
export type theme_editor_logCreationAttributes = Optional<theme_editor_logAttributes, theme_editor_logOptionalAttributes>;

export class theme_editor_log extends Model<theme_editor_logAttributes, theme_editor_logCreationAttributes> implements theme_editor_logAttributes {
  kind?: number;
  ip?: string;
  date?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof theme_editor_log {
    return theme_editor_log.init({
    kind: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true,
      comment: "种类"
    },
    ip: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'theme_editor_log',
    timestamps: false
  });
  }
}
