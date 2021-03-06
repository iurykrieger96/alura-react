import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class CustomInput extends Component {
	constructor() {
		super();
		this.state = { error: {} };
	}

	componentDidMount() {
		PubSub.subscribe('validation-error', (channel, error) => {
			console.log(error);
			if (error.field == this.props.id) {
				this.setState({ error: error });
			}
		});

		PubSub.subscribe('clean-error', (channel, error) => {
			this.setState({ error: {} });
		});
	}

	render() {
		return (
			<div className="pure-control-group">
				<label htmlFor={this.props.id}>
					{this.props.label}
				</label>
				<input {...this.props} />
				<span className="validation">
					{this.state.error.defaultMessage}
				</span>
			</div>
		);
	}
}
