import { combineReducers } from 'redux';
import blogs from './blogs'
import account from './account';
import alert from './alert';
import errors from './errors';
import tags from './tags'
export default combineReducers({
    blogs,
    account,
    alert,
    errors,
    tags
});
