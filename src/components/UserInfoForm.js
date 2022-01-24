import React from 'react'
import { useReducer } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export function UserInfoForm() {

    const [formValues, setFormValues] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            firstName: '',
            lastName: '',
            gender: '',
            maritalStatus: '',
            birthDate: '',
            chosenInt: ''
        }
    );
    const navigate = useNavigate();

    const maritalOptions = [
        { name: "Single", value: "single"},
        { name: "Married", value: "married"}
      ];

    /*
      Populate state object with form values only needing a single handler.
      If complexity was increased this should be done as a more fleshed out dispatcher with switch cases.
      The chosenInt check prevents entering negative numbers into the input
      Using useReducer as I want to reduce the state to a single object.
      Not using debouncing on fields as we aren't doing anything extensive on changes.
    */
    function handleOnChange(e, index) {
        let { name, value } = e.target;
        if (name === 'chosenInt') {
            value = value.replace(/\D/,'');
        }
        if (name === 'maritalStatus') {
            value = maritalOptions[index].value;
        }
        setFormValues({[name]: value});
    };

    /*
      Handle the form submit to add users to the result to be used on the Results screen.
      In a practical application we would test for duplicate entries 
    */
    function handleSubmit(e) {
        e.preventDefault();
        let results = [];
        if (sessionStorage.getItem('results')) {
           results = JSON.parse(sessionStorage.getItem('results'));
        }
        results.push(formValues); 
        sessionStorage.setItem('results', JSON.stringify(results));
        navigate('/results');
    };

    return (
        <Container>
            <h2 className="mb-3">Find Your FizzBuzz</h2>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            onChange={(e) => handleOnChange(e)} 
                            required
                            name="firstName" 
                            type="text" 
                            placeholder="Enter First Name"/>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            onChange={(e) => handleOnChange(e)} 
                            required 
                            name="lastName"
                            type="text" 
                            placeholder="Enter Last Name" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Col md="4">
                        <Form.Select onChange={(e) => handleOnChange(e)} aria-label="Select Gender">
                            <option>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md="4">
                    {maritalOptions.map((radio, index) => {
                        return (<Form.Check
                            key={index}
                            inline
                            name="maritalStatus"
                            type='radio'
                            id={index}
                            label={radio.name}
                            onChange={(e) => handleOnChange(e, index)}
                        />)
                    })}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="dob">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control 
                            onChange={(e) => handleOnChange(e)}
                            name="birthDate" 
                            required 
                            type="date"/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="chosenInt">
                        <Form.Label>Lucky Number</Form.Label>
                        <Form.Control
                            onChange={(e) => handleOnChange(e)}  
                            required
                            name="chosenInt" 
                            type="number" 
                            min="0"
                            placeholder="Enter Number" 
                            aria-describedby="numberHelp"
                            value={formValues.chosenInt}/>
                        <Form.Text id="numberHelp" muted>Please enter your favorite positive whole number</Form.Text>
                    </Form.Group>
                </Row>
                <Row>
                    <Col md="2">
                        <Button variant="primary" type="submit">Submit</Button>
                    </Col>
                </Row>
            </Form>
            
        </Container>
    )
}
