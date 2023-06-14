import GlobalStyle from './styles/global';
import { toast, ToastContainer } from 'react-toastify';
import Grid from './components/Grid.js'
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import Form from './components/Form.js';
import { useState, useEffect } from 'react';
import axios from "axios";


const Container = styled.div`
    
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

`;


const Title = styled.h2``;


function App() {


  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);


  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8800");
      setUsers(response.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (e) {
      toast.error(e);
    }
  }

  useEffect(() => {
    getUsers();
  }, [setUsers]);


  return (

    <>
      <Container>
        <Title> Usuários </Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
      </Container>

      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>

  );
}

export default App;
