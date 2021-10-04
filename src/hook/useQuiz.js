import { fetchData, methodType, dataToGet, type } from "fetchhelper";

export const useQuiz = (
  nom,
  setData,
  setResponses,
  setQuestion,
  setStat,
  setLoad
) => {
  fetchData(
    "/test/Content/Exemple/" + nom + ".json",
    methodType.Get,
    null,
    {
      ...dataToGet,
      type: type.json,
      callback: (data) => {
        console.log(data);
        setData({ ...data });
        setQuestion({ ...data.question[0] });
        setResponses([...data.question[0].responses]);
        setStat({
          ...{
            sujet: data.stat.subject,
            score: 0,
            scoreMax: 0,
            numQuestion: 1,
            nombreQuestions: data.stat.questions,
          },
        });
        setLoad(true);
      },
    },
    false,
    false
  );
};
