import { useState } from 'react';
import { Form, FormLabel, LabelName, FormInput, FormBtn } from './ContactForm.styled';
import PropTypes from 'prop-types';

export const ContactForm = ({addContact}) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = e => {
        const { name, value } = e.currentTarget;

       name === 'name' ? setName(value) : setNumber(value);
    };

    const resetForm = () => {
        setName('');
        setNumber('');
  };

    const handleSubmit = e => {
        e.preventDefault();
       addContact({name, number});
        resetForm();
    };

        return (
            <Form onSubmit={handleSubmit}>
                <FormLabel>
                    <LabelName>Name</LabelName>
                    <FormInput
                    onChange={handleChange}
                    type="text"
                    value={name}
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' ][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    />
                </FormLabel>
                <FormLabel>
                    <LabelName>Number</LabelName>
                    <FormInput
                    onChange={handleChange}
                    type="tel"
                    value={number}
                    name="number"
                    pattern="\+?\d{1,4}?[\-\.\s]?\(?\d{1,3}?\)?[\-\.\s]?\d{1,4}[\-\.\s]?\d{1,4}[\-\.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    />
                </FormLabel>
                <FormBtn type="submit">Add contact</FormBtn>
            </Form>
        )
    
};

ContactForm.propTypes = {
    addContact: PropTypes.func.isRequired,
};