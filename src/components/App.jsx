import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'; 
import { GlobalStyle } from "./GlobalStyle";
import { Layout } from "./Layout/Layout";
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const initialContacts = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(() => JSON.parse(window.localStorage.getItem('contacts')) ?? initialContacts);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))}, [contacts]);

  const addContact = ({ name, number }) => {
    if (
      contacts.some(
        value => value.name.toLocaleLowerCase() === name.toLocaleLowerCase() 
      )
    ) {
      alert(`${name} is already in contacts`);
    } else if (
       contacts.some(
          value => value.number.toLocaleLowerCase() === number.toLocaleLowerCase()
      )
    ) {
      alert(`This phone number is already in contacts`);
    } else {
      setContacts(prevState => [
        ...prevState,
        {
          id: nanoid(),
          name: name,
          number: number
        }
      ]);
    }
  };

  const onInputChange = e => {
   setFilter(e.currentTarget.value);
  };

  const onFilter = () => {
   const filteredContacts = contacts.filter(
      contact => contact.name.toLowerCase().includes(filter.toLowerCase()) 
    );
   return filteredContacts;
  };

  const deleteContact = id => {
    const filtered = contacts.filter(item => item.id !== id);
    setContacts(filtered);
  };

  return (
    <Layout>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onInputChange={onInputChange} />
      <ContactList contacts={onFilter()} deleteContact={deleteContact} />
      <GlobalStyle/>
    </Layout>
  )
  
};