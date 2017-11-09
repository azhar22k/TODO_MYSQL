import {combineReducers} from 'redux';

const updateList = (state = {tasks:[],title:'', text:'', btn:'Create New Task'}, action) => {

	let xx = state.tasks;
	let obj = {};
	switch (action.type) {
	case 'UPDATE_LIST':
		obj[action.title] = action.text;
		var arr = [];
		arr.push(obj);

		state = {
			...state,
			tasks: state.tasks.concat(arr),
			title:'',
			text:''
		};
		break;
	case 'DELETE_TASK_LIST':
		xx = state.tasks;
		xx.splice(action.index, 1);

		state = {
			...state,
			btn:'Create New Task',
			tasks:xx
		};
		break;
	case 'UPDATE_BUTTON_NAME':
		state = {
			...state,
			btn:'Update Task'
		};
		break;
	case 'UPDATE_TASK':
		xx.splice(action.index, 1);
		obj[action.title] = action.text;
		xx.push(obj);
		state = {
			...state,
			btn:'Create New Task',
			tasks:xx
		};
		break;
	case 'CANCEL_ACTION':
		state = {
			...state,
			btn:'Create New Task'
		};
		break;
	default:
		break;
	}
	return state;
};

const todoApp = combineReducers({
	list: updateList
});

export default todoApp;
