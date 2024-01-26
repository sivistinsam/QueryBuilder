import React, { useState } from "react";
import '../App.js';

const RuleForm = () => {
  const [rules, setRules] = useState([
    {
      key: "age",
      output: {
        value: [""],
        operator: ">=",
        score: [""],
      },
    },
  ]);

  const [combinator, setCombinator] = useState("and");

  const addRule = () => {
    setRules([
      ...rules,
      { key: "", output: { value: [""], operator: ">=", score: [""] } },
    ]);
  };

  const deleteRule = (index) => {
    const updatedRules = [...rules];
    updatedRules.splice(index, 1);
    setRules(updatedRules);
  };

  const handleChange = (index, field, value, subField, subIndex) => {
    const updatedRules = [...rules];
    const ruleToUpdate = { ...updatedRules[index] };

    if (subField === "value" || subField === "score") {
      if (!ruleToUpdate.output[subField]) {
        ruleToUpdate.output[subField] = [];
      }

      if (typeof ruleToUpdate.output[subField] === "string") {
        ruleToUpdate.output[subField] = [value];
      } else {
        ruleToUpdate.output[subField][subIndex] = value;
      }
    } else if (subField === "operator") {
      ruleToUpdate.output.value = [""];
      ruleToUpdate.output.score = [""];
      ruleToUpdate.output[subField] = value;
    } else {
      ruleToUpdate[field] = value;
    }

    updatedRules[index] = ruleToUpdate;
    setRules(updatedRules);
  };

  const getJsonOutput = () => {
    return JSON.stringify({ rules, combinator }, null, 2);
  };

  return (
    <div className="container">
      <div className="inputArea">
        <div className="col">
          <div className="rule-form">
            <label>Connector Type</label> &nbsp;
            <select
              className="AndSelector"
              value={combinator}
              onChange={(e) => setCombinator(e.target.value)}
            >
              <option value="and">AND</option>
              <option value="or">OR</option>
            </select>
            &nbsp; &nbsp;
            <button className="AddRuleButton" onClick={addRule}>
              Add Rule
            </button>
            <div className="RuleSegment">
              {rules.map((rule, index) => (
                <div key={index} className="rule-container">
                  <div className="RuleTypeSegment">
                    <label>Rule Type</label> &nbsp;
                    <select className="DropDown"
                      value={rule.key}
                      onChange={(e) =>
                        handleChange(index, "key", e.target.value)
                      }
                    >
                      <option value="age">Age</option>
                      <option value="creditScore">Credit Score</option>
                      <option value="accountBalance">Account Balance</option>
                    </select>
                  </div>

                  <div className="operatorSegment">
                    <label>Operator</label>&nbsp;
                    <select className="DropDown"
                      value={rule.output.operator}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "output",
                          e.target.value,
                          "operator"
                        )
                      }
                    >
                      <option value=">">{">"}</option>
                      <option value="<">{"<"}</option>
                      <option value=">=">{">="}</option>
                      <option value="<=">{"<="}</option>
                      <option value="=">{"="}</option>
                    </select>
                  </div>

                  <div className="valueSegment">
                    <label>Values</label>&nbsp;
                    {rule.output.value &&
                      rule.output.value.map((value, subIndex) => (
                        <input className="input"
                          key={subIndex}
                          type="text"
                          placeholder={`Enter Value ${subIndex + 1}`}
                          value={value}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "output",
                              e.target.value,
                              "value",
                              subIndex
                            )
                          }
                        />
                      ))}
                  </div>
                  <div className="ScoreSegment">
                    <label>Scores</label>&nbsp;
                    {rule.output.score &&
                      rule.output.score.map((score, subIndex) => (
                        <input className="input"
                          key={subIndex}
                          type="text"
                          placeholder={`Enter Score ${subIndex + 1}`}
                          value={score}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "output",
                              e.target.value,
                              "score",
                              subIndex
                            )
                          }
                        />
                      ))}
                  </div>

                  <div className="delButton">
                    <button className="deleteButton" onClick={() => deleteRule(index)}>
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="jsonArea">
        <div className="row">
          <div className="col">
            <div className="json-output">
              <label>JSON Output</label>
              <pre>{getJsonOutput()}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuleForm;
