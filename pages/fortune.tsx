import { Splide, SplideSlide } from "@splidejs/react-splide";
import React, { useState } from "react";

import { Alert, Button, Form, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { BsFillBellFill } from "react-icons/bs";
import { RxArchive, SiOctopusdeploy } from "react-icons/rx";
import Layout from "../components/Layout";


export default function FortunePage() {

  return (
    <Layout>
      <div id="Fortune">
        <h1>Fortune</h1>
        <Splide
          className="mt-5 w-100"
          options={{
            autoplay: true,
            interval: 3000,
            rewind: true,
            pauseOnHover: true,
            pauseOnFocus: true,
            arrows: true,
            pagination: false,
            type: 'loop',
          }}
        >
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
              return (
                <SplideSlide key={index}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                      <p className="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                      </p>
                      <a href="#" className="card-link">Card link</a>
                      <a href="#" className="card-link">Another link</a>
                    </div>
                  </div>
                </SplideSlide>
              );
            })
          }
        </Splide>
      </div>
    </Layout>
  );
};
