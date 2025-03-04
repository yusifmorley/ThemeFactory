import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface jump_to_themeAttributes {
  type?: number;
  theme_name?: string;
  date?: Date;
}

export type jump_to_themeOptionalAttributes = "type" | "theme_name" | "date";
export type jump_to_themeCreationAttributes = Optional<jump_to_themeAttributes, jump_to_themeOptionalAttributes>;

export class jump_to_theme extends Model<jump_to_themeAttributes, jump_to_themeCreationAttributes> implements jump_to_themeAttributes {
  type?: number;
  theme_name?: string;
  date?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof jump_to_theme {
    return jump_to_theme.init({
    type: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true
    },
    theme_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'jump_to_theme',
    timestamps: false
  });
  }
}
