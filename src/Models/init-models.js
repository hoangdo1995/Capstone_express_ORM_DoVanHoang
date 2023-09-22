import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _comment from  "./comment.js";
import _image from  "./image.js";
import _storage_image from  "./storage_image.js";
import _user from  "./user.js";

export default function initModels(sequelize) {
  const comment = _comment.init(sequelize, DataTypes);
  const image = _image.init(sequelize, DataTypes);
  const storage_image = _storage_image.init(sequelize, DataTypes);
  const user = _user.init(sequelize, DataTypes);

  comment.belongsTo(image, { as: "image", foreignKey: "image_id"});
  image.hasMany(comment, { as: "comments", foreignKey: "image_id"});
  storage_image.belongsTo(image, { as: "image", foreignKey: "image_id"});
  image.hasOne(storage_image, { as: "storage_image", foreignKey: "image_id"});
  comment.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(comment, { as: "comments", foreignKey: "user_id"});
  image.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(image, { as: "images", foreignKey: "user_id"});
  storage_image.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(storage_image, { as: "storage_images", foreignKey: "user_id"});

  return {
    comment,
    image,
    storage_image,
    user,
  };
}
