import React from "react";
import ReactDOM from "react-dom";
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CssBaseline,
  CardHeader,
  CardMedia,
} from "@mui/material";
import style from "../assets/Modal.module.css";

const APICard = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div className={style.modal}>
          <div>
            <br />
            <div className="row">
              <div className="col-sm-3">API: </div>
              <div className="col-sm-9">{props.api}</div>
            </div>
            <div className="row">
              <div className="col-sm-3">Description: </div>
              <div className="col-sm-9">{props.desc}</div>
            </div>
            <div className="row">
              <div className="col-sm-3">Authentication: </div>
              <div className="col-sm-9">{props.auth ? props.auth : "NONE"}</div>
            </div>
            <div className="row">
              <div className="col-sm-3">HTTPS: </div>
              <div className="col-sm-9">
                {props.https ? "SECURE" : "NOT SECURE"}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">Cors: </div>
              <div className="col-sm-9">{props.cors.toUpperCase()}</div>
            </div>
            <div className="row">
              <div className="col-sm-3">Link: </div>
              <div className="col-sm-9">
                <a href={props.link} target="_blank">
                  {props.link}
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">Category: </div>
              <div className="col-sm-9">{props.cat}</div>
            </div>
            <div className="row">
              <div className="col-md-9"></div>
              <button
                className="col-md-3"
                onClick={() => {
                  props.setModal(false);
                  props.resetState(null);
                }}
              >
                Back
              </button>
            </div>
          </div>
        </div>,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default APICard;
