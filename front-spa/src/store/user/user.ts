import { login, register} from './actions';
import { actions, reducer } from './slice';

const allActions = {
    ...actions,
    login,
    register,
};

export { allActions as actions, reducer };