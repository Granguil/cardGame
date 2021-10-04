import React, { useEffect, useState } from "react";
import { SimpleCard } from "card";
import Style from "./questionnary.module.css";
import { useHistory, useParams } from "react-router";
import { useQuiz } from "../hook/useQuiz";
import Response from "./Response";
import { PopupChildren } from "popup";
import { NewToaster, positionToaster, colorToaster } from "toaster";
import { ButtonCustom, ButtonTypeList } from "button";

export default function Quiz() {
  const { subject } = useParams();
  console.log(subject);
  const history = useHistory();
  const [load, setLoad] = useState(false);
  const [displayPopup, setDisplayPopup] = useState(false);
  const [data, setData] = useState([]);
  const [responses, setResponses] = useState([]);
  const [stat, setStat] = useState({
    sujet: "",
    score: 0,
    scoreMax: 0,
    numQuestion: 1,
    nombreQuestions: 3,
  });
  const [question, setQuestion] = useState({
    question: "",
    nombreProposition: 0,
  });
  const getQuiz = useQuiz;
  useEffect(() => {
    setLoad(false);
    getQuiz(subject, setData, setResponses, setQuestion, setStat, setLoad);
  }, [subject, getQuiz]);
  const validation = (index) => {
    let numQuest = stat.numQuestion;
    let oldStat = { ...stat };
    if (index + 1 === question.response) {
      oldStat.score += question.points;
      NewToaster({
        title: "Bonne Réponse",
        text: "Vous avez marqué " + question.points + " points !",
        position: positionToaster.left,
        color: colorToaster.success,
      });
    } else {
      NewToaster({
        title: "Mauvaise Réponse",
        text: "Vous avez marqué 0 point !",
        position: positionToaster.left,
        color: colorToaster.error,
      });
    }
    oldStat.scoreMax += question.points;
    oldStat.numQuestion++;
    setStat({ ...oldStat });
    if (numQuest < stat.nombreQuestions) {
      setQuestion({ ...data.question[numQuest] });
      setResponses([...data.question[numQuest].responses]);
    } else {
      setDisplayPopup(true);
    }
  };
  const close = () => {
    return (
      <ButtonCustom
        text={"Fermer"}
        type={ButtonTypeList.back}
        callback={() => {
          setDisplayPopup(false);
          history.push("/test");
        }}
      />
    );
  };
  return (
    <div>
      {load ? (
        <div>
          <div className={Style.body}>
            <SimpleCard>
              <div className={Style.InCard}>
                <div>{stat.sujet}</div>
                <div>Score</div>
                <div>{stat.score}</div>
                <div>Score Max</div>
                <div>{stat.scoreMax}</div>
                <div>Numéro de la Question</div>
                <div>{stat.numQuestion}</div>
                <div>Nombre de Questions</div>
                <div>{stat.nombreQuestions}</div>
              </div>
            </SimpleCard>
            <SimpleCard>
              <div className={Style.InCard}>
                <div>Question : </div>
                <div>{question.question}</div>
                <div>Nombre de Propositions : </div>
                <div>{question.nombreProposition}</div>
              </div>
            </SimpleCard>
          </div>
          <div className={Style.body}>
            {responses.map((response, index) => {
              return (
                <SimpleCard key={index}>
                  <Response
                    response={response}
                    index={index}
                    callback={validation}
                  />
                </SimpleCard>
              );
            })}
          </div>
        </div>
      ) : (
        <h3>Chargement ...</h3>
      )}
      {displayPopup ? (
        <PopupChildren type={"Afficher"} buttons={[() => close()]}>
          <div className={Style.InCard}>
            <div>{stat.sujet}</div>
            <div>Score Final</div>
            <div>{stat.score}</div>
            <div>Score Max</div>
            <div>{stat.scoreMax}</div>
            <div>Nombre de Questions</div>
            <div>{stat.nombreQuestions}</div>
          </div>
        </PopupChildren>
      ) : null}
    </div>
  );
}
