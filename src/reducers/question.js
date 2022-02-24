export const types = {
  SET_EMAIL: "question/SET_EMAIL",
  SET_ID: "question/SET_ID",
  GET_QUESTION: "question/GET_QUESTION",
  GET_DIMENSIONS: "question/GET_DIMENSIONS",
  GET_ALL_QUESTION: "question/GET_ALL_QUESTION",
  SET_RESPONSE: "question/SET_RESPONSE",
  SET_VALUE: "question/SET_VALUE",
  HIDDE_QUESTION: "question/HIDDE_QUESTION",
};

export const INITIAL_STATE = {
  questions: null,
  email: "",
  id: -1,
  dimensions: [],
  response: 0,
  values: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    questions: [],
  },
};

export default (state, action) => {
  // eslint-disable-next-line no-param-reassign
  state = !state ? INITIAL_STATE : state;
  switch (action.type) {
    case types.SET_EMAIL:
      return {
        ...state,
        email: action.email,
      };
    case types.SET_ID:
      return {
        ...state,
        id: action.id,
      };
    case types.GET_QUESTION:
      return {
        ...state,
        questions: action.questions,
      };
    case types.GET_DIMENSIONS:
      return {
        ...state,
        dimensions: action.dimensions,
      };
    case types.GET_ALL_QUESTION:
      return {
        ...state,
        questions: action.questions,
      };
    case types.SET_RESPONSE:
      return {
        ...state,
        response: action.response,
      };
    case types.SET_VALUE:
      if (
        Object.keys(state.values).length > 1 &&
        state.values.questions.find(
          (question) =>
            question.dimension === action.values.dimension &&
            question.question === action.values.question
        )
      ) {
        return {
          ...state,
          values: {
            ...state.values,
            [action.values.dimension]:
              parseFloat(state.values[action.values.dimension]) -
              parseFloat(state.values.lastValue) +
              parseFloat(action.values.value),
            lastValue: action.values.value,
          },
        };
      }

      return {
        ...state,
        values: {
          ...state.values,
          questions: [
            ...state.values.questions,
            {
              dimension: action.values.dimension,
              question: action.values.question,
            },
          ],
          [action.values.dimension]: state.values[action.values.dimension]
            ? parseFloat(state.values[action.values.dimension]) +
              parseFloat(action.values.value)
            : parseFloat(action.values.value),
          lastValue: action.values.value,
        },
      };
    case types.HIDDE_QUESTION:
      const questions = state.questions.map((item) =>
        item.map((question) => {
          if (
            question.id > action.values.id &&
            question.id < action.values.jump
          ) {
            return {
              ...question,
              isVisible: action.values.visible,
            };
          }
          return question;
        })
      );
      return {
        ...state,
        questions,
      };
    default:
      return state;
  }
};

export const actions = {
  setEmail: (email) => ({
    type: types.SET_EMAIL,
    email,
  }),
  setId: (id) => ({
    type: types.SET_ID,
    id,
  }),
  getAllQuestions: (questions) => ({
    type: types.GET_ALL_QUESTION,
    questions,
  }),
  getDimensions: (dimensions) => ({
    type: types.GET_DIMENSIONS,
    dimensions,
  }),
  getQuestion: (question) => ({
    type: types.GET_QUESTION,
    question,
  }),
  setResponse: (response) => ({
    type: types.SET_RESPONSE,
    response,
  }),
  setValues: (values) => ({
    type: types.SET_VALUE,
    values,
  }),
  hiddeQuestions: (id, jump, visible) => ({
    type: types.HIDDE_QUESTION,
    values: { id, jump, visible },
  }),
};

export const selectors = {
  getQuestions: ({ question }) => question.questions,
  getEmail: ({ question }) => question.email,
  getDimensions: ({ question }) => question.dimensions,
  getId: ({ question }) => question.id,
  getResponse: ({ question }) => question.response,
  getValues: ({ question }) => question.values,
};
