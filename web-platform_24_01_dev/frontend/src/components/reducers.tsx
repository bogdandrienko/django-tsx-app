export function constructorReducer(constant: any) {
  return function (state = {}, action: { type: string; payload: any }) {
    switch (action.type) {
      case constant.load:
        return { load: true };
      case constant.success:
        return { load: false, data: action.payload };
      case constant.fail:
        return { load: false, fail: action.payload };
      case constant.error:
        return { load: false, error: action.payload };
      case constant.reset:
        return {};
      default:
        return state;
    }
  };
}
