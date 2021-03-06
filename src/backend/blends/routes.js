const blendRoutes = {
  getBlends: (schema) => {
    const blends = schema.db.blends;
    return blends;
  },
  getBlend: (schema, request) => {
    const { id } = request.params;
    const blend = schema.db.blends.find(id);
    return blend;
  },
  addBlend: (schema, request) => {
    const body = JSON.parse(request.requestBody);
    // add new blend
    const blendRes = schema.db.blends.insert(body);
    return blendRes;
  },
};

export default blendRoutes;
