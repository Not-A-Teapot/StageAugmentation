import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useAsync } from 'react-async-hook';
import { useForm } from 'react-hook-form';
import { getVersion, login, verify } from '../services/redux/axios/login';
import { User } from '../types/AppState';

const Login: React.FC = () => {

  const { result: version } = useAsync(getVersion, []);

  const { register, formState, getValues } = useForm<Required<Pick<User, "id" | "password">>>({
    mode: "onChange",
    defaultValues: {
      id: "",
      password: ""
    }
  })

  return (
    <>
      <Form>
        <Form.Group as={Row}>
            <Form.Label as={Col} sm={2}>Username</Form.Label>
            <Col sm={4}>
              <Form.Control
                required
                {...register("id", {
                  required: true,
                })}
              />
            </Col>
        </Form.Group>
        <Form.Group as={Row}>
            <Form.Label as={Col} sm={2}>Password</Form.Label>
            <Col sm={4}>
              <Form.Control
                required
                {...register(("password"), {
                  required: true,
                })}
              />
            </Col>
        </Form.Group>
        <Button disabled={!formState.isValid} onClick={() => verify('1234').then((reply) => console.log(reply))}>Login</Button>
      </Form>
      <p>version: {version?.data}</p>
    </>
  );
};

export default Login;