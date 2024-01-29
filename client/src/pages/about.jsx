/*******************************************************************
 * Carleton Bootcamp - 2024
 * Copyright 2024 Sonja Gorin, Jacob Martin, Gustavo Miller
 * License: free and unencumbered software
 * Assignment # 20 - React Portfolio
 *
 * Filename: about.jsx
 * Date : 1/22/2024 9:05:01 PM
 *******************************************************************/
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import UploadWidget from "../components/UploadWidget.jsx";
import "./about.css";

export default function About() {
  return (
    <div className="about-height">
      <section className="py-3 py-md-5 py-xl-8">
        <Container>
          <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
            <div className="col-12 col-lg-6 col-xl-5">
              <img
                className="img-fluid rounded"
                loading="lazy"
                src="../images/doggie.webp"
                alt=""
              />
            </div>
            <div className="col-12 col-lg-6 col-xl-7">
              <div className="row justify-content-xl-center">
                <div className="col-12 col-xl-11">
                  <h2 className="h1 mb-3">Who Are We?</h2>
                  <p className="lead fs-4 text-secondary mb-3">
                    We help pet owners search for them when they take the wrong
                    turn. Our goal is to bring your pet back home
                  </p>
                  <p className="mb-5">
                    We are a small but fast-growing service, we have never lost
                    sight of our core values. We believe in collaboration,
                    innovation, and customer satisfaction. We are always looking
                    for new ways to improve our products and services.
                  </p>
                </div>

                <div className="col-4">
                  <div className="d-grid ">
                    <Link
                      to="/Register"
                      className="btn btn-primary btn-lg"
                      type="submit"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
