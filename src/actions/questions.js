import { actions } from "../reducers/question";
// Middleware
import {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateQuestion,
  getQuestions,
  getOptions,
  getDimensions,
  setResult,
  sendMail,
} from "../middleware/questions";

export default {
  getAllUsers: (params) => {
    return async (dispatch) => {
      const users = await getAllUsers(params);
      dispatch(actions.getAllQuestions(users));
    };
  },
  getDimensions: (params) => {
    return async (dispatch) => {
      const dimensions = await getDimensions(params);
      dispatch(actions.getDimensions(dimensions));
    };
  },
  getUserByEmail: (params) => {
    return async (dispatch) => {
      const user = await getUserByEmail(params);
      dispatch(actions.getQuestion(user));
    };
  },
  createUser: (params) => {
    return async (dispatch) => {
      const { statusCode, id } = await createUser(params);
      dispatch(actions.setId(id));
      dispatch(actions.setResponse(statusCode));
    };
  },
  updateQuestion: (params) => {
    return async () => {
      await updateQuestion(params);
    };
  },
  sendMail: (params) => {
    return async () => {
      await sendMail(params);
    };
  },
  setResult: (params) => {
    return async () => {
      await setResult(params);
    };
  },
  getQuestions: (params) => {
    return async (dispatch) => {
      const {
        statusCode: questionStatus,
        data: questions,
      } = await getQuestions(params);
      const { statusCode: optionStatus, data: options } = await getOptions(
        params
      );
      if (questionStatus !== 200 || optionStatus !== 200) return;

      let array = questions.map((item) => ({
        ...item,
        isVisible: true,
        options: options.filter((option) => option.idQuestion === item.id),
      }));
      array = array.reduce((previous, next) => {
        if (!previous[next.step]) previous[next.step] = [];
        previous[next.step].push(next);
        return previous;
      }, []);
      dispatch(actions.getAllQuestions(array));
    };
  },
};
