import axios from "axios";
// constructors
import * as constants from "../components/constants";

export async function constructorGetAction(
  dispatch: any,
  constant: any,
  url: any,
) {
  try {
    dispatch({ type: constant.load });
    url = `${constants.API}${url}`;
    console.log("url: ", url);
    const response = await axios.get(url);
    if (response.status === 200 || response.status === 201) {
      dispatch({
        type: constant.success,
        payload: response.data.response,
      });
    } else {
      // TODO error
      dispatch({
        type: constant.error,
        payload: response.statusText,
      });
    }
  } catch (error) {
    console.log("error: ", error);
    dispatch({
      type: constant.fail,
      // @ts-ignore
      payload: error.toString(),
    });
  }
}

export async function constructorPostAction(
  dispatch: any,
  constant: any,
  url: any,
  form: any,
) {
  try {
    dispatch({ type: constant.load });
    url = `${constants.API}${url}`;
    console.log("url: ", url);
    const response = await axios.post(url, form);
    if (response.status === 200 || response.status === 201) {
      dispatch({
        type: constant.success,
        payload: response.data.response,
      });
    } else {
      // TODO error
      dispatch({
        type: constant.error,
        payload: response.statusText,
      });
    }
  } catch (error) {
    console.log("error: ", error);
    dispatch({
      type: constant.fail,
      // @ts-ignore
      payload: error.toString(),
    });
  }
}
