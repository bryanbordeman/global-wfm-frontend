import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import UserService from '../services/User.services'

export default function EmployeePicker(props) {
    const [ value, setValue ] = React.useState(null)
    const [ employees, setEmployees ] = React.useState([{}])
    const [ inputValue, setInputValue ] = React.useState('');

    const { handleChangeEmployee, errors} = props

    React.useEffect(() => {
        retrieveEmployees()
    },[])

    const retrieveEmployees = () => {
        UserService.getUsers(props.token)
        .then(response => {
            setEmployees(response.data);
        })
        .catch( e => {
            console.log(e);
        })
    }
    const handleInputValue = (newValue) => {
        setValue(newValue);
        handleChangeEmployee(newValue)
    };

    return (
        <Autocomplete
        disablePortal
        fullWidth
        autoSelect = {false}
        blurOnSelect = 'touch'
        value={value}
        onChange={(event, newValue) => {
            handleInputValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
        }}
        options={employees}
        getOptionLabel={(option) => (`${option.first_name} ${option.last_name}`)}
        renderInput={(params) => <TextField 
                                helperText={errors && errors.employee? errors.employee : ''}
                                error={errors && errors.employee? true : false}
                                {...params} 
                                id="employee"
                                name='employee'
                                label="Search Employees" 
                                />}
        />
    );
};


    // // sample list
    // const projects = [{  
    //     number: '14122',
    //     name: 'JFK University Med Center',
    //     project_category: 'MRI',
    //     project_type: 'Siemens',
    //     address: {
    //             address1: '65 James St.',
    //             address2: '',
    //             city: 'Edison',
    //             state: 'NJ',
    //             zip_code: '08820',
    //             country: 'USA'},
    //     customer_company: {
    //             name: 'Hackensack Meridian Health',
    //             address: {
    //                 address1: 'Post Office Box 31235',
    //                 address2: '',
    //                 city: 'Salt Lake City',
    //                 state: 'UT',
    //                 zip_code: '84131',
    //                 country: 'USA'},
    //             phone:'732-509-5512',
    //             fax: '',
    //             website: 'https://www.hackensackmeridianhealth.org/'
    //         },
    //     contact: [
    //         {
    //             name: 'Colin Wallace', 
    //             company: 'Hackensack Meridian Health',
    //             phone: '732-509-5512',
    //             fax: '',
    //             email: 'Colin.Wallace@hmhn.org'
    //         },
    //         {
    //             name: 'Bryan Bordeman', 
    //             company: 'Global Shielding',
    //             phone: '845-321-6134',
    //             fax: '',
    //             email: 'bbordeman@global-shielding.com'
    //         },
    //     ],
    //     prevailing_rate: true,
    //     travel_job: false,
    //     notes: '',
    // },
    // {  
    //     number: '14022',
    //     name: 'JFK University Med Center',
    //     project_category: 'MRI',
    //     project_type: 'Siemens',
    //     address: {
    //             address1: '65 James St.',
    //             address2: '',
    //             city: 'Edison',
    //             state: 'NJ',
    //             zip_code: '08820',
    //             country: 'USA'},
    //     customer_company: {
    //             name: 'Hackensack Meridian Health',
    //             address: {
    //                 address1: 'Post Office Box 31235',
    //                 address2: '',
    //                 city: 'Salt Lake City',
    //                 state: 'UT',
    //                 zip_code: '84131',
    //                 country: 'USA'},
    //             phone:'732-509-5512',
    //             fax: '',
    //             website: 'https://www.hackensackmeridianhealth.org/'
    //         },
    //     contact: [{
    //             name: 'Colin Wallace', 
    //             company: 'Hackensack Meridian Health',
    //             phone: '732-509-5512',
    //             fax: '',
    //             email: 'Colin.Wallace@hmhn.org'
    //         }],
    //     prevailing_rate: false,
    //     travel_job: false,
    //     notes: '',
    // },
    // {  
    //     number: '13922',
    //     name: 'JFK University Med Center',
    //     project_category: 'MRI',
    //     project_type: 'Siemens',
    //     address: {
    //             address1: '65 James St.',
    //             address2: '',
    //             city: 'Edison',
    //             state: 'NJ',
    //             zip_code: '08820',
    //             country: 'USA'},
    //     customer_company: {
    //             name: 'Hackensack Meridian Health',
    //             address: {
    //                 address1: 'Post Office Box 31235',
    //                 address2: '',
    //                 city: 'Salt Lake City',
    //                 state: 'UT',
    //                 zip_code: '84131',
    //                 country: 'USA'},
    //             phone:'732-509-5512',
    //             fax: '',
    //             website: 'https://www.hackensackmeridianhealth.org/'
    //         },
    //     contact: [{
    //             name: 'Colin Wallace', 
    //             company: 'Hackensack Meridian Health',
    //             phone: '732-509-5512',
    //             fax: '',
    //             email: 'Colin.Wallace@hmhn.org'
    //         }],
    //     prevailing_rate: false,
    //     travel_job: false,
    //     notes: '',
    // },
    // {  
    //     number: '13822',
    //     name: 'JFK University Med Center',
    //     project_category: 'MRI',
    //     project_type: 'Siemens',
    //     address: {
    //             address1: '65 James St.',
    //             address2: '',
    //             city: 'Edison',
    //             state: 'NJ',
    //             zip_code: '08820',
    //             country: 'USA'},
    //     customer_company: {
    //             name: 'Hackensack Meridian Health',
    //             address: {
    //                 address1: 'Post Office Box 31235',
    //                 address2: '',
    //                 city: 'Salt Lake City',
    //                 state: 'UT',
    //                 zip_code: '84131',
    //                 country: 'USA'},
    //             phone:'732-509-5512',
    //             fax: '',
    //             website: 'https://www.hackensackmeridianhealth.org/'
    //         },
    //     contact: [{
    //             name: 'Colin Wallace', 
    //             company: 'Hackensack Meridian Health',
    //             phone: '732-509-5512',
    //             fax: '',
    //             email: 'Colin.Wallace@hmhn.org'
    //         }],
    //     prevailing_rate: false,
    //     travel_job: false,
    //     notes: '',
    // },
    // {  
    //     number: '13722',
    //     name: 'JFK University Med Center',
    //     project_category: 'MRI',
    //     project_type: 'Siemens',
    //     address: {
    //             address1: '65 James St.',
    //             address2: '',
    //             city: 'Edison',
    //             state: 'NJ',
    //             zip_code: '08820',
    //             country: 'USA'},
    //     customer_company: {
    //             name: 'Hackensack Meridian Health',
    //             address: {
    //                 address1: 'Post Office Box 31235',
    //                 address2: '',
    //                 city: 'Salt Lake City',
    //                 state: 'UT',
    //                 zip_code: '84131',
    //                 country: 'USA'},
    //             phone:'732-509-5512',
    //             fax: '',
    //             website: 'https://www.hackensackmeridianhealth.org/'
    //         },
    //     contact: [{
    //             name: 'Colin Wallace', 
    //             company: 'Hackensack Meridian Health',
    //             phone: '732-509-5512',
    //             fax: '',
    //             email: 'Colin.Wallace@hmhn.org'
    //         }],
    //     prevailing_rate: false,
    //     travel_job: false,
    //     notes: '',
    // },
    // {  
    //     number: '13622',
    //     name: 'JFK University Med Center',
    //     project_category: 'MRI',
    //     project_type: 'Siemens',
    //     address: {
    //             address1: '65 James St.',
    //             address2: '',
    //             city: 'Edison',
    //             state: 'NJ',
    //             zip_code: '08820',
    //             country: 'USA'},
    //     customer_company: {
    //             name: 'Hackensack Meridian Health',
    //             address: {
    //                 address1: 'Post Office Box 31235',
    //                 address2: '',
    //                 city: 'Salt Lake City',
    //                 state: 'UT',
    //                 zip_code: '84131',
    //                 country: 'USA'},
    //             phone:'732-509-5512',
    //             fax: '',
    //             website: 'https://www.hackensackmeridianhealth.org/'
    //         },
    //     contact: [{
    //             name: 'Colin Wallace', 
    //             company: 'Hackensack Meridian Health',
    //             phone: '732-509-5512',
    //             fax: '',
    //             email: 'Colin.Wallace@hmhn.org'
    //         }],
    //     prevailing_rate: false,
    //     travel_job: false,
    //     notes: '',
    // },
    // {  
    //     number: '13522',
    //     name: 'JFK University Med Center',
    //     project_category: 'MRI',
    //     project_type: 'Siemens',
    //     address: {
    //             address1: '65 James St.',
    //             address2: '',
    //             city: 'Edison',
    //             state: 'NJ',
    //             zip_code: '08820',
    //             country: 'USA'},
    //     customer_company: {
    //             name: 'Hackensack Meridian Health',
    //             address: {
    //                 address1: 'Post Office Box 31235',
    //                 address2: '',
    //                 city: 'Salt Lake City',
    //                 state: 'UT',
    //                 zip_code: '84131',
    //                 country: 'USA'},
    //             phone:'732-509-5512',
    //             fax: '',
    //             website: 'https://www.hackensackmeridianhealth.org/'
    //         },
    //     contact: [{
    //             name: 'Colin Wallace', 
    //             company: 'Hackensack Meridian Health',
    //             phone: '732-509-5512',
    //             fax: '',
    //             email: 'Colin.Wallace@hmhn.org'
    //         }],
    //     prevailing_rate: false,
    //     travel_job: false,
    //     notes: '',
    // }];


