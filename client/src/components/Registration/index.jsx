/*******************************************************************
 * Carleton Bootcamp - 2024
 * Copyright 2024 Sonja Gorin, Jacob Martin, Gustavo Miller
 * License: MIT
 * Project #03 - Locate-o-pet
 *
 * Filename: Regisration/index.js
 * Date : 1/23/2024 11:30:54 AM
 *******************************************************************/
import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
// import { Link } from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";
import { USER_EMAIL } from "../../utils/queries";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import Swal from "sweetalert2";

export default function Registration() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    name: "",
  });
  const [addUser] = useMutation(ADD_USER);

  const { loading, error, data } = useQuery(USER_EMAIL, {
    variables: { email: formState.email },
  });
  const [isClicked, setIsClicked] = useState(false);
  const triggerRef = useRef(null);
  const [pageName, setPageName] = useState("index.jsx");
  const [modalState, setModalState] = useState(false);

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  const emailValidation = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;
  const passwordValidation =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  useEffect(() => {
    document.title = "Locate-O-Pet";
    if (pageName === "index.jsx") {
      document.title = "Register";
    }

    return () => {
      document.title = "Locate-O-Pet";
    };
  }, [pageName]);

  useEffect(() => {
    const outsideClick = (event) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target)) {
        setIsClicked(false);
      }
    };

    document.addEventListener("click", outsideClick);

    return () => {
      document.removeEventListener("click", outsideClick);
    };
  }, []);

  const handleClick = () => {
    setIsClicked(true);
  };

  const handleEmpty = (event) => {
    const { name, value } = event.target;
    if (name === "name" && value === "") {
      Swal.fire({
        position: "center-center",
        icon: "error",
        title: "Must fill name field.",
        text: event.message,
        showConfirmButton: false,
        timer: 2500,
      });
    } else if (name === "email" && value === "") {
      Swal.fire({
        position: "center-center",
        icon: "error",
        title: "Must fill email field.",
        text: event.message,
        showConfirmButton: false,
        timer: 2500,
      });
    } else if (name === "password" && value === "") {
      Swal.fire({
        position: "center-center",
        icon: "error",
        title: "Must fill password field.",
        text: event.message,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = data?.userEmail || {};
      console.log(userData);

      if (
        !emailValidation.test(formState.email) &&
        passwordValidation.test(formState.password)
      ) {
        Swal.fire({
          position: "center-center",
          icon: "error",
          title: "Must provide a valid email.",
          text: event.message,
          showConfirmButton: false,
          timer: 2500,
        });
      }

      if (
        emailValidation.test(formState.email) &&
        !passwordValidation.test(formState.password)
      ) {
        Swal.fire({
          position: "center-center",
          icon: "error",
          title:
            "Password must be of 8 characters minimum. Must contain one of each lowercase, uppercase, digit, and special character.",
          text: event.message,
          showConfirmButton: false,
          timer: 2500,
        });
      }

      if (
        !emailValidation.test(formState.email) &&
        !passwordValidation.test(formState.password)
      ) {
        Swal.fire({
          position: "center-center",
          icon: "error",
          title: "Neither email nor password conform to the rules.",
          text: event.message,
          showConfirmButton: false,
          timer: 2500,
        });
      }

      if (userData === true) {
        Swal.fire({
          position: "center-center",
          icon: "error",
          title: "User with this email already exists. Please choose another.",
          text: event.message,
          showConfirmButton: false,
          timer: 2500,
        });
      }

      const mutationResponse = await addUser({
        variables: {
          name: formState.name,
          email: formState.email,
          password: formState.password,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * This will listen for any changes on the form and set the state of the form (formState). The source
   * it is contained in the event.target
   * @param {*} event
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <div className="row gy-3 overflow-hidden">
        <div className="flex-row space-between my-2">
          <div className="col-12">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                value={formState.name}
                placeholder="First Name"
                onChange={handleChange}
                onBlur={handleEmpty}
                required
              />
              <label htmlFor="name" className="form-label">
                Name
              </label>
            </div>
          </div>
        </div>
        <div className="flex-row space-between my-2">
          <div className="col-12">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                placeholder="youremail@lost-pets.com"
                name="email"
                value={formState.email}
                type="text"
                id="email"
                onChange={handleChange}
                onBlur={handleEmpty}
              />
              <label htmlFor="email" className="form-label">
                Email
              </label>
            </div>
          </div>
        </div>
        <div className="flex-row space-between my-2">
          <div className="col-12">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                placeholder="*****"
                name="password"
                value={formState.password}
                type="password"
                id="pwd"
                onChange={handleChange}
                onBlur={handleEmpty}
                onClick={handleClick}
                ref={triggerRef}
              />
              <label htmlFor="pwd" className="form-label">
                Password:
              </label>
              <div>
                {isClicked && (
                  <p className="text-center">
                    Password must have minimum of 8 characters, and one of each
                    lower/upper/digit/special char.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              name="iAgree"
              id="iAgree"
              required
            />
            <label className="form-check-label text-secondary" htmlFor="iAgree">
              I agree to the{" "}
              <a
                href="#!"
                className="link-primary text-decoration-none"
                onClick={openModal}
              >
                terms and conditions
              </a>
            </label>
          </div>
        </div>
        <div className="col-12">
          <div className="d-grid">
            <button className="btn btn-primary btn-lg" type="submit">
              Sign up
            </button>
          </div>
        </div>
      </div>
      <Modal
        appElement={document.getElementById('root')}
        isOpen={modalState}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "600px",
            backgroundColor: "white",
            borderRadius: "20px",
          },
        }}
      >
        <div className="h-25 bg-primary">
          <h4 className="text-center text-white mb-4 display-5">
            Terms and Conditions
          </h4>
        </div>
        <div className="h-75 d-flex flex-column justify-content-center align-items-center">
          <p className = "overflow-y-scroll">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            bibendum eros et ex ultrices tempus. Donec aliquet tristique tortor,
            vitae posuere lorem. Mauris et urna quis neque finibus interdum.
            Pellentesque erat purus, pellentesque nec libero vel, mattis lacinia
            risus. Pellentesque in tortor in mauris egestas cursus. Nulla dictum
            risus ipsum, nec venenatis libero tincidunt vitae. Nullam in ante
            consequat, dictum elit quis, tincidunt felis. Quisque tempor erat ac
            ligula dignissim, nec luctus purus convallis. Integer pretium ipsum
            sit amet mollis sodales. Sed non metus quam. Nulla sollicitudin quam
            at erat egestas auctor. Duis sapien neque, mollis nec scelerisque
            sed, semper vel purus. Curabitur non posuere ligula. Maecenas
            laoreet, diam at dapibus blandit, ex lacus gravida purus, a finibus
            dolor neque quis lacus. Phasellus tristique odio sed nisl
            consectetur, quis eleifend dui consectetur. Phasellus nec turpis vel
            mauris pretium imperdiet. Fusce pharetra, enim ac vulputate
            convallis, odio enim tincidunt felis, eget dictum risus enim non
            sem. 
          </p>
          <button className="align-self-end align-self-center" onClick={closeModal}>
            Close
          </button>
        </div>
      </Modal>
    </Form>
  );
}
