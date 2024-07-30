import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import handleKeyDown from '../common/validation';

const Container = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  margin: 5px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

const Error = styled.p`
  color: red;
`;

const TodoItem = styled.li`
  margin-bottom: 10px;
`;

function Dashboard() {
    const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', description: '' });
  const [error, setError] = useState(null);
  const [updateId, setUpdateId] = useState(null);

  const data =localStorage.getItem("token");

  useEffect(() => {
    if(!data){
        navigate("/")
      }
  }, [data])


  useEffect(() => {
    axios.get('http://localhost:7000/')
      .then(response => setTodos(response.data))
      .catch(error => setError('Error fetching todos: ' + error.message));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateId) {
      handleUpdate();
    } else {
      axios.post('http://localhost:7000/', form)
        .then(response => {
          setTodos([...todos, response.data]);
          setForm({ name: '', email: '', description: '' });
        })
        .catch(error => setError('Error adding todo: ' + error.message));
    }
  };

  const handleUpdate = () => {
    if (!updateId) {
      setError('Please select a todo to update.');
      return;
    }

    axios.put(`http://localhost:7000/${updateId}`, form)
      .then(response => {
        const updatedTodos = todos.map(todo => {
          if (todo._id === updateId) {
            return { ...todo, ...form };
          }
          return todo;
        });
        setTodos(updatedTodos);
        setUpdateId(null);
        setForm({ name: '', email: '', description: '' });
      })
      .catch(error => setError('Error updating todo: ' + error.message));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:7000/${id}`)
      .then(response => setTodos(todos.filter(todo => todo._id !== id)))
      .catch(error => setError('Error deleting todo: ' + error.message));
  };

  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate("/")
  }

  const handleSelectUpdate = (id, name, email, description) => {
    setUpdateId(id);
    setForm({ name, email, description });
    setError(null);
  };  

  return (
    <Container>
        <Button onClick={handleLogout} style={{marginLeft:"80%"}}>Logout</Button>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          onKeyDown={handleKeyDown}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          disabled={updateId ? true : false}
          onKeyDown={(event) => {
            if (event.key === " ") {
              event.preventDefault();
            }
          }}
        />
        <Input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          required
        />
        <Button type="submit">{updateId ? 'Update Todo' : 'Add Todo'}</Button>
        {updateId && (
          <Button type="button" onClick={() => setUpdateId(null)}>Cancel Update</Button>
        )}
      </Form>
      {error && <Error>{error}</Error>}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todos.map(todo => (
          <TodoItem key={todo._id}>
            <h2>{todo.name}</h2>
            <p>{todo.email}</p>
            <p>{todo.description}</p>
            <Button onClick={() => handleSelectUpdate(todo._id, todo.name, todo.email, todo.description)}> Update</Button>
            <Button onClick={() => handleDelete(todo._id)}>Delete</Button>
          </TodoItem>
        ))}
      </ul>
    </Container>
  );
}

export default Dashboard;



