export function addToDo(title, text) {
	return {
		type: 'UPDATE_LIST',
		title: title,
		text: text
	};
}

export function deleteTaskList(index) {
	return {
		type: 'DELETE_TASK_LIST',
		index: index
	};
}

export function updateButtonName() {
	return {
		type: 'UPDATE_BUTTON_NAME'
	};
}

export function updateTaskList(title, text, index) {
	return {
		type: 'UPDATE_TASK',
		title: title,
		text: text,
		index: index
	};
}

export function cancelAction(){
	return {
		type: 'CANCEL_ACTION'
	};
}
