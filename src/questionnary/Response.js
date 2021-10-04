import React from "react";
import Style from "./questionnary.module.css";
import { ButtonCustom, ButtonTypeList } from "button";

export default function Response({ response, index, callback }) {
  return (
    <div className={Style.InCard}>
      <div>{response}</div>
      <ButtonCustom
        type={ButtonTypeList.create}
        text="Valider"
        callback={() => {
          callback(index);
        }}
      />
    </div>
  );
}
