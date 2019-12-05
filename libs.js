const create = async (Model, objCreate) => {
  return Model.create(objCreate);
};

module.exports = { create };
