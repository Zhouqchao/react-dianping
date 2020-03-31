const normalizeData = (data, schema) => {
  const { id, name } = schema;
  let obj = {};
  let ids = [];
  if (Array.isArray(data)) {
    data.map(item => {
      obj[item[id]] = item;
      ids.push(item[id]);
    });
  } else {
    obj[data[id]] = data;
    ids.push(data[id]);
  }

  return {
    [name]: obj,
    ids
  };
};

export default function callAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      types,
      schema,
      callAPI,
      shouldCallAPI = () => true,
      payload = {}
    } = action;

    if (!types) {
      // Normal action: pass it on
      return next(action);
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === "string")
    ) {
      throw new Error("Expected an array of three string types.");
    }

    if (typeof callAPI !== "function") {
      throw new Error("Expected callAPI to be a function.");
    }

    if (!shouldCallAPI(getState())) {
      return;
    }

    const [requestType, successType, failureType] = types;

    dispatch(
      Object.assign({}, payload, {
        type: requestType
      })
    );

    return callAPI().then(
      response =>
        dispatch(
          Object.assign({}, payload, {
            response: schema ? normalizeData(response, schema) : response,
            type: successType
          })
        ),
      error =>
        dispatch(
          Object.assign({}, payload, {
            error,
            type: failureType
          })
        )
    );
  };
}
