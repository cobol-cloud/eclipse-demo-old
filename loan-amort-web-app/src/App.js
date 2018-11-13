import React, { Component } from 'react';
import './App.css';
import { FormGroup, ControlLabel, FormControl, InputGroup } from 'react-bootstrap'
import { DropdownButton } from 'react-bootstrap'
import { MenuItem } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Glyphicon } from 'react-bootstrap'
import {Grid, Row, Col} from 'react-bootstrap'
import {Table} from 'react-bootstrap'

const currencies = ["€", "£", "$"];

class App extends Component {

	constructor(props, context) {
		super(props, context);
		this.handleStateChange = this.handleStateChange.bind(this);
		this.calculate = this.calculate.bind(this);
		this.handleClearClick = this.handleClearClick.bind(this);
		this.handleApiEndpointEdit = this.handleApiEndpointEdit.bind(this);
		
		const cachedApiEndpoint = localStorage.getItem("loanCalculatorApiEndpoint");
		this.state = {
				principal: '',
				loanTerm: '',
				loanRate: '',
				currency: currencies[1],
				isLoading: false,
				apiEndpointEditMode: false,
				apiEndpoint: (cachedApiEndpoint) ? cachedApiEndpoint : '',
				tableData: []
		};

	}

	handleStateChange(event) {
		const target = event.target;
		const name = target.name;		
		const value = target.value;
		this.setState({
		  [name]: value
		});
	}
	
	handleApiEndpointEdit(event) {
		 if (this.state.apiEndpointEditMode) {
				localStorage.setItem("loanCalculatorApiEndpoint", this.state.apiEndpoint);
		 }
		 else { 
//			 this.apiEndPointTextInput.focus();
		 }
		this.setState(prevState => ({apiEndpointEditMode: !prevState.apiEndpointEditMode}))
	}

	validatePrincipal(value) {
		return this.validatePositiveInteger(value);
	}
	
	validateLoanTerm(value) {
		return this.validatePositiveInteger(value);
	}

	validateLoanRate(value) {
		return null;
	}
	
	validatePositiveInteger(value) {
		if (value===null || value==='') { 
			return null; 
		}
		if (this.isPositiveInteger(value)) {
			return 'success';
		} else {
			return 'error';
		}
	}
	
  handleCurrencySelect(eventKey, event) {
    this.setState({currency: currencies[eventKey]});
  }	

  handleClearClick() {
		this.setState( {
				principal: '',
				loanTerm: '',
				loanRate: '',
				currency: currencies[1],
				isLoading: false,
				apiEndpointEditMode: false,
				apiEndpoint: '',
				tableData: []
		});
	}
  
	isPositiveInteger(x) {
		if (isNaN(x) || Number(x) <= 0 ) return false;
		return true;
	}
	
	canBeSubmitted() {
		const { principal, loanTerm, apiEndpoint } = this.state;
		return this.isPositiveInteger(principal) && this.isPositiveInteger(loanTerm) && apiEndpoint && apiEndpoint.length > 0;
	}
	
	calculate() {
		const params = {
			p : this.state.principal,
			t : this.state.loanTerm,
			r : this.state.loanRate
		}

		this.setState({isLoading: true});
		this.makeRequest(params).then(data => {
				console.log("Result fetched")
				console.log(this.state);
				this.setState({tableData: data.amortList});
 			    this.setState({isLoading: false});
				})
				.catch(this.setState({isLoading: false}));
	}

	async makeRequest (params) {
		var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
		const apiURL = this.state.apiEndpoint + '?' + queryString;

		console.log("Executing async/await based request");
		console.log(apiURL);
		const response = await fetch(apiURL);

		return await response.json();
	}
  
  renderTable (tableData) {
		var table_headers = [];
		var headers = Object.keys(tableData[0]);
		headers.forEach(header => table_headers.push(<th key={header}>{header}</th>));
		
		var table_rows = [];
		var cols = Object.keys(tableData[0]);
		var rowId = 0;
		tableData.map(dataRow => {
			rowId++;
			var cells = cols.map(colData => {
				return <td key={colData + rowId}> {dataRow[colData]} </td>;
			});
			return table_rows.push(<tr key={rowId}>{cells}</tr>)
		});

	  	return (
		<div>
	  	  <Table striped bordered>
	  	  	<thead><tr>{table_headers}</tr></thead>
	  	   <tbody>{table_rows}</tbody>
		</Table>
		</div>
		)
  }
	  
	render() {
		console.log("rendering...");
		const { tableData } = this.state;
		const isLoading = this.state.isLoading;
		return (
<Grid>
	<Row> 
	  <Col sm={12}  md={4}>
		<div>
				  <FormGroup controlId="formApiEndpoint"> 
				     <ControlLabel>API Endpoint</ControlLabel>
				     <InputGroup>
				      	<FormControl type="text" readOnly={!this.state.apiEndpointEditMode} name="apiEndpoint" value={this.state.apiEndpoint} onChange={this.handleStateChange}/>
				      	<InputGroup.Button>
				      		<Button 
								aria-label="Edit"
								onClick={this.handleApiEndpointEdit}>

								<Glyphicon glyph={(this.state.apiEndpointEditMode)
										  ? "glyphicon glyphicon-ok" 
										  : "glyphicon glyphicon-pencil" 
										}/>
							</Button>
				      	</InputGroup.Button>
				    </InputGroup>
				  </FormGroup>
		
		
					<FormGroup controlId="formPrincipal" validationState={this.validatePrincipal(this.state.principal)}>
					    <ControlLabel>Loan Amount</ControlLabel>
						<InputGroup>
						  <FormControl
								type="text"
								placeholder="Enter principal"
								name="principal"
								value={this.state.principal}
								onChange={this.handleStateChange}
						  />
						  <DropdownButton
							componentClass={InputGroup.Button}
							id="dropdown-addon-currency"
							title={this.state.currency}
							onSelect={this.handleCurrencySelect.bind(this)}
						  >
						  {currencies.map((opt, i) => (
							  <MenuItem key={i} eventKey={i} active={this.state.currency===opt}>
								{opt}
							  </MenuItem>
						 ))}
		
						  </DropdownButton>
						</InputGroup>
					  </FormGroup>

					  <FormGroup controlId="formLoanTerm" validationState={this.validateLoanTerm(this.state.loanTerm)}>
						  <ControlLabel>Term</ControlLabel>
						  <InputGroup>
							  <FormControl
								type="text"
								name="loanTerm"
								value={this.state.loanTerm}
								placeholder="Enter loan term"
								onChange={this.handleStateChange}
							  />
							  <InputGroup.Addon>months</InputGroup.Addon>
						  </InputGroup>
						</FormGroup>

					  <FormGroup controlId="formLoanRate" validationState={this.validateLoanRate(this.state.loanRate)}>
						  <ControlLabel>Annual Percentage Rate</ControlLabel>
						  <InputGroup>
							  <FormControl
								type="text"
								name="loanRate"
								value={this.state.loanRate}
								placeholder="Enter rate"
								onChange={this.handleStateChange}
							  />
							  <InputGroup.Addon>%</InputGroup.Addon>
						  </InputGroup>
					</FormGroup>
	</div>
	</Col>
	</Row>
	<div className="with-bottom-margin-10">
	<Row>
  <Col sm={6}  md={2}>	
					<Button
							disabled={!this.canBeSubmitted() || isLoading}
							type="submit"
							onClick={!isLoading ? this.calculate : null}
							block
						> 
							{isLoading ? 'Calculating...' : 'Calculate'}
					</Button>
  </Col>
  <Col sm={6}  md={2}>	
					<Button
						block
						type="reset"
						onClick={this.handleClearClick}> 
							Clear
					</Button>
  </Col>
  </Row>
  </div>

  <div className="with-bottom-margin-10">
	<Row>
	  <Col sm={12}  md={4}>
		<Button 
		block
		disabled> 
			Amortization Table
	</Button>
	  </Col>
	</Row>
  </div>

	<Row>
	<div>
		{tableData && tableData.length > 0 &&
			this.renderTable(tableData)
		}
	</div>
	</Row>
</Grid>
				   );
					 
	}
	
}

export default App;
