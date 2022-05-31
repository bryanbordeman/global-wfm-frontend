import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ProjectDataService from '../services/Project.services'

export default function ProjectPicker(props) {
    const [ value, setValue ] = React.useState(null)
    const [ projects, setProjects ] = React.useState([{}])
    const [inputValue, setInputValue] = React.useState('');

    const { handleChangeProject, errors} = props

    React.useEffect(() => {
        retrieveProject()
    },[])

    // React.useEffect(() => {
    //     console.log(projects)
    // }, [projects])

    const retrieveProject = () => {
        ProjectDataService.getAll(props.token)
        .then(response => {
            // console.log(response.data);
            setProjects(response.data);
        })
        .catch( e => {
            console.log(e);
        })
    }
    const handleInputValue = (newValue) => {
        setValue(newValue);
        handleChangeProject(newValue)
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
        options={projects}
        getOptionLabel={(option) => String(option.number).toString()}
        renderInput={(params) => <TextField 
                                helperText={errors.project === null ? '' : errors.project}
                                error={errors.project? true : false}
                                {...params} 
                                id="project"
                                name='project'
                                label="Search Projects" 
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


