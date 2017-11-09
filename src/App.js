/* eslint-disable no-unused-vars*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	addToDo,
	deleteTaskList,
	updateButtonName,
	updateTaskList,
	cancelAction} from './actions/action';
import ReactDOM from 'react-dom';
import {
	Button,
	ListGroup,
	FormGroup,
	ControlLabel,
	FormControl
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

export class App extends Component {
	constructor(props) {
		super(props);
		this.currentText = '';
		this.currentTitle = '';
		this.updateIndex = 0;
	}

	deleteTask(index, txt, title) {

		this.props.dispatch(deleteTaskList(index));

		if (ReactDOM.findDOMNode(this.refs.title).value === title) {
			ReactDOM.findDOMNode(this.refs.title).value = '';
			ReactDOM.findDOMNode(this.refs.text).value = '';
		}
	}

	displayTask(txt, title, index) {
		ReactDOM.findDOMNode(this.refs.title).value = title;
		ReactDOM.findDOMNode(this.refs.text).value = txt;
		this.currentText = txt;
		this.currentTitle = title;
		this.updateIndex = index;
		this.props.dispatch(updateButtonName());
	}

	updateTask() {
		if (this.currentText.length > 0) {
			this.props.dispatch(updateTaskList(
				this.currentTitle.length<1
					?this.currentText.slice(0,20)
					:this.currentTitle,
				this.currentText, this.currentText, this.updateIndex));
		}
		else {
			alert('please fill the Note field');
		}
	}
	cancelUpdateTask() {
		this.props.dispatch(cancelAction());
		ReactDOM.findDOMNode(this.refs.title).value = '';
		ReactDOM.findDOMNode(this.refs.text).value = '';
	}
	addTask(event) {
		if (this.props.ll.btn === 'Create New Task') {
			if (this.currentText.length > 0) {
				this.props.dispatch(addToDo(
					this.currentTitle.length<1
						?this.currentText.slice(0,20)
						:this.currentTitle,
					this.currentText));
			}
			else {
				alert('please fill the Note field');
			}
		}
		else {
			this.updateTask();
		}


		// for emptying the value in input text
		ReactDOM.findDOMNode(this.refs.title).value = '';
		ReactDOM.findDOMNode(this.refs.text).value = '';
		this.currentText = '';
		this.currentTitle = '';
	}

	/* eslint-disable no-console */
	render() {
		return (<div className='jumbotron'>
			<div className='container'>
				<div className='row'>
					{console.log('TASK STATUS',this.props.ll.tasks )}
					<div className='col-md-3'>
						{
							this.props.ll.tasks.map((data, index) => {
								var kk = Object.keys(data);
								return (<div key={index}>
									<ListGroup className='row'>
										<Button
											className='col-md-10' key={index}
											onClick={this.displayTask.bind(this, data[kk[0]], kk[0])}>
											Note: {kk}
										</Button>
										<Button className='col-md-2' bsStyle='danger'
											onClick={
												this.deleteTask.bind(
													this, index, data[kk[0]], kk[0])}>x</Button>
									</ListGroup>
								</div>);
							})
						}
					</div>
					<div className='col-md-9'>
						<div className='row'>
							<div className='col-md-4'>
								<FormGroup controlId='formControlsTextarea'>
									<ControlLabel>Title</ControlLabel>
									<FormControl componentClass='textarea'
										placeholder='This field is optional...'
										ref='title' maxLength='20' onChange={(event) => {
											this.currentTitle = event.target.value;
										}}/>
								</FormGroup>
							</div>
							<div className='col-md-8'>
								<FormGroup controlId='formControlsTextarea'>
									<ControlLabel>Notes</ControlLabel>
									<FormControl componentClass='textarea'
										placeholder='Write your notes here...'
										ref='text' onChange={(event) => {
											this.currentText = event.target.value;
										}}/>
								</FormGroup>
							</div>
						</div>
						<div className='row'>
							<div className='col-md-2'>
								<Button bsStyle='success' className='button'
									onClick={this.addTask.bind(this)}>{
										this.props.ll.btn.length<1
											?'Create New Task'
											:this.props.ll.btn}</Button>
							</div>
							{(() => {
								if (this.props.ll.btn === 'Update Task') {
									return (<div className='col-md-2'>
										<Button bsStyle='danger' className='button'
											onClick={this.cancelUpdateTask.bind(this)}>Cancel</Button>
									</div>);
								}
							})()}
						</div>
					</div>
				</div>
			</div>
		</div>);
	}
}
//}

const mapStatetoProps = (state) => ({ll: state.list});

const mapDispatchtoProps = (dispatch) => ({dispatch: dispatch});

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
