const initialState = {
  id: null,
  select_country: null,
  select_City: null,
  token: null,
  category_Id: [],
  category_name: '',
  driverData: [],
};
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'User_id':
      return {...state, id: action.id};
    case 'select_country':
      return {...state, select_country: action.id};
    case 'select_City':
      return {...state, select_City: action.id};
    case 'Token':
      return {...state, token: action.id};
    case 'category_Id':
      return {...state, category_Id: action.id};
    case 'category_name':
      return {...state, category_name: action.id};
    case 'driver_Data':
      return {...state, driverData: action.id};
    default:
      break;
  }
};
export default mainReducer;
