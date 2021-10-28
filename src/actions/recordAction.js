import * as actionTypes from "./actionTypes";

export const createRecord = (record) => {
  return {
    type: actionTypes.CREATE_NEW_RECORD,
    record: record,
  };
};

export const deleteRecord = (id) => {
  return {
    type: actionTypes.REMOVE_RECORD,
    id: id,
  };
};

export const editRecord = (record, id) => {
  return {
    type: actionTypes.EDIT_RECORD,
    id: id,
    record: record,
  };
};
