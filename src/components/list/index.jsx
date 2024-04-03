import React from 'react';
import PropTypes from 'prop-types';

class List extends React.Component {
	constructor(props) {
		super(props);
	}

	editClickHandle = (id) => {
		const spanName = document.querySelector(`[data-name="${id}"]`);
		const inputName = document.querySelector(`[data-name-input="${id}"]`);

		const spanPhone = document.querySelector(`[data-phone="${id}"]`);
		const inputPhone = document.querySelector(`[data-phone-input="${id}"]`);

		const spanEmail = document.querySelector(`[data-email="${id}"]`);
		const inputEmail = document.querySelector(`[data-email-input="${id}"]`);

		const editButton =  document.querySelector(`[data-edit="${id}"]`);
		const deleteButton =  document.querySelector(`[data-delete="${id}"]`);
		const saveButton =  document.querySelector(`[data-save="${id}"]`);
		const cancelButton =  document.querySelector(`[data-cancel="${id}"]`);

		inputName.value = spanName?.innerHTML;
		inputPhone.value = spanPhone?.innerHTML;
		inputEmail.value = spanEmail?.innerHTML;

		this.hideElement(spanName);
		this.hideElement(spanPhone);
		this.hideElement(spanEmail);
		this.hideElement(editButton);
		this.hideElement(deleteButton);

		this.showElement(inputName);
		this.showElement(inputPhone);
		this.showElement(inputEmail);
		this.showElement(saveButton);
		this.showElement(cancelButton);
	}
	cancelClickHandle = (id) => {
		const spanName = document.querySelector(`[data-name="${id}"]`);
		const inputName = document.querySelector(`[data-name-input="${id}"]`);

		const spanPhone = document.querySelector(`[data-phone="${id}"]`);
		const inputPhone = document.querySelector(`[data-phone-input="${id}"]`);

		const spanEmail = document.querySelector(`[data-email="${id}"]`);
		const inputEmail = document.querySelector(`[data-email-input="${id}"]`);

		const editButton =  document.querySelector(`[data-edit="${id}"]`);
		const deleteButton =  document.querySelector(`[data-delete="${id}"]`);
		const saveButton =  document.querySelector(`[data-save="${id}"]`);
		const cancelButton =  document.querySelector(`[data-cancel="${id}"]`);

		inputName.value = '';
		inputPhone.value = '';
		inputEmail.value = '';

		this.showElement(spanName);
		this.showElement(spanPhone);
		this.showElement(spanEmail);
		this.showElement(editButton);
		this.showElement(deleteButton);

		this.hideElement(inputName);
		this.hideElement(inputPhone);
		this.hideElement(inputEmail);
		this.hideElement(saveButton);
		this.hideElement(cancelButton);
	}
	saveClickHandle = (id) => {
		const inputName = document.querySelector(`[data-name-input="${id}"]`);
		const inputPhone = document.querySelector(`[data-phone-input="${id}"]`);
		const inputEmail = document.querySelector(`[data-email-input="${id}"]`);

		const newStutent = {
			name: inputName?.value,
			phone: inputPhone?.value,
			email: inputEmail?.value,
		}
		newStutent.id = id;

		if(!this.isStudentValid(newStutent)) return;
		this.props.update(newStutent);
		this.cancelClickHandle(id)
	}
	isStudentValid = (student) => {
		// Kiểm tra các trường có dữ liệu
		if (!student.name || !student.phone || !student.email) {
			alert('Please complete all fields ')
			return false;
		}
		
		  // Kiểm tra phone là số
		  if (isNaN(student.phone)) {
			alert('Phone invalid');
			return false;
		}
		
		  // Kiểm tra định dạng email
		  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		  if (!regexEmail.test(student.email)) {
			alert('Email invalid')
			return false;
		}
		
		  // Nếu tất cả kiểm tra thành công, trả về student
		return true;
	}
	hideElement = (ele) => {
		if(!ele) return;
		const classlist = ele.classList;
		!classlist.contains('d-none') && classlist.add('d-none')
	}
	showElement = (ele) => {
		if(!ele) return;
		ele.classList.remove('d-none')
	}

	renderList = () => this.props?.list?.map(item => <tr data-row={item.id} key={item.id}>
		<td>
			<span
				data-name={item.id}
			>
				{item.name}
			</span>
			<input
				className='d-none' 
				data-name-input={item.id}
			/>
		</td>
		<td>
			<span data-phone={item.id}>
				{item.phone}
			</span>
			<input 
				className='d-none' 
				data-phone-input={item.id}
			/>
		</td>
		<td>
			<span data-email={item.id}>
				{item.email}
			</span>
			<input 
				className='d-none' 
				data-email-input={item.id}
			/>
		</td>
		<td style={{gap: '8px'}} className='d-flex'>
			<button  
				data-edit={item.id}
				onClick={this.editClickHandle.bind(null, item.id)}  
				type="button" 
				className="btn btn-primary"
			>
				Edit
			</button>
			<button 
				data-delete={item.id}
				onClick={this.props.remove.bind(null, item.id)} 
				type="button" 
				className="btn btn-danger"
			>
				Delete
			</button>
			<button  
				data-save={item.id}
				onClick={this.saveClickHandle.bind(null, item.id)}  
				type="button"
				className="btn btn-primary d-none"
			>
				Save
			</button>
			<button
				data-cancel={item.id}
				onClick={this.cancelClickHandle.bind(null, item.id)} 
				type="button"
				className="btn btn-danger d-none"
			>
				Cancel
			</button>
		</td>
	</tr>)

	render() {
		return (
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Phone</th>
						<th scope="col">Email</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{this.renderList()}
				</tbody>
		  	</table>
		);
	}
}

export default List;