import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {

	static propTypes = { 
		addStudent: PropTypes.func 
	}
	constructor(props) {
		super(props);
		this.state = {
		   name: '',
		   phone:'',
		   email: ''  
		};
	}

	formSumitHandle = (ev) => {
		ev.preventDefault();

		this.props.addStudent({
			name: this.state.name,
		   	phone: this.state.phone,
		   	email: this.state.email 
		})
		this.setState({
			name: '',
			phone:'',
			email: ''  
		 })
	}

	inputChangeHandle = (ev) => {
		const name = ev.target.name;
		this.setState({
			[name]: ev.target.value
		})
	}

	render() {
		return (
		   <form onSubmit={this.formSumitHandle}>
			  	<div className="mb-3">
					<label htmlFor="name-form" className="form-label">
						Name: 
						</label>
					<input 
						name='name' 
						onChange={this.inputChangeHandle} 
						required
						type="text" 
						className="form-control" 
						id="name-form"
					 	placeholder="Name" 
						value={this.state.name}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="phone-form" className="form-label">
						Phone
					</label>
					<input 
					name='phone' 
					onChange={this.inputChangeHandle}
						required
						type="number"
						className="form-control" 
						id="phone-form"
						placeholder="Phone" 
						value={this.state.phone}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="email-form" className="form-label">
						Email address
						</label>
					<input
						name='email' 
						onChange={this.inputChangeHandle}
						required
						type="email"
						className="form-control" 
						id="email-form"
						placeholder="Email" 
						value={this.state.email}
					/>
				</div>
				<button type="submit" className="btn btn-success">Add</button>
		   </form>
		);
	}
}

export default Form;