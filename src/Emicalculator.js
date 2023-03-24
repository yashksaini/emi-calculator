import React, { useEffect, useState } from "react";

const Emicalculator = () => {
  const [data, setData] = useState({
    loan: 100000,
    intrest: 1,
    year: 1,
  });
  const [emi, setEmi] = useState(0);
  const [graphOffset, setGraphOffset] = useState(0);
  const [intrestAmount, setIntrestAmount] = useState(0);
  useEffect(() => {
    const graphConst = 478;
    const p = data.loan;
    const r = data.intrest / 12 / 100;
    const n = data.year * 12;
    const e = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmi(Math.round(e));
    const interestValue = Math.round(e) * n - p;
    setIntrestAmount(interestValue);
    const portion =
      interestValue / (parseInt(data.loan) + parseInt(interestValue));
    setGraphOffset(-graphConst * portion);
  }, [data]);
  return (
    <div className="container">
      <div className="box">
        <div className="stats">
          <div className="title">
            <h1>EMI Calculator</h1>
            <div className="line"></div>
          </div>
          <div className="infoBox">
            <svg>
              <circle cx="84" cy="84" r="76"></circle>
              <circle
                cx="84"
                cy="84"
                r="76"
                style={{ strokeDashoffset: graphOffset }}
              ></circle>
            </svg>
            <div>
              <p>Total Amount</p>
              <h4>₹{parseInt(data.loan) + parseInt(intrestAmount)}</h4>
            </div>
          </div>
          <div className="partitions">
            <div>
              <span className="light"></span> Interest Amount
            </div>
            <div>
              <span className="dark"></span> Principal Amount
            </div>
          </div>
          <div className="footer">
            <div className="line"></div>
            <div className="finalAmount">
              <span>Monthly EMI</span>
              <span>₹{emi}</span>
            </div>
          </div>
        </div>
        <div className="controls">
          <div className="title1">
            <h1>EMI Calculator</h1>
            <div className="line"></div>
          </div>
          <div className="control">
            <div className="header">
              <span>Loan Amount</span>
              <span>₹{data.loan}</span>
            </div>
            <input
              type="range"
              step={50000}
              value={data.loan}
              min={100000}
              max={10000000}
              onInput={(e) => {
                const min = e.target.min;
                const max = e.target.max;
                const value = e.target.value;
                setData({ ...data, loan: value });
                const finalValue = ((value - min) / (max - min)) * 100;
                e.target.style.background =
                  "linear-gradient(to right, #f99822 0%, #f99822 " +
                  finalValue +
                  "%, #f1f1f1 " +
                  finalValue +
                  "%, #f1f1f1 100%)";
              }}
            />
          </div>
          <div className="control">
            <div className="header">
              <span>Rate of Interest (p.a)</span>
              <span>{data.intrest}%</span>
            </div>
            <input
              type="range"
              step={0.5}
              value={data.intrest}
              min={1}
              max={30}
              onInput={(e) => {
                const min = e.target.min;
                const max = e.target.max;
                const value = e.target.value;
                const finalValue = ((value - min) / (max - min)) * 100;
                setData({ ...data, intrest: value });
                e.target.style.background =
                  "linear-gradient(to right, #f99822 0%, #f99822 " +
                  finalValue +
                  "%, #f1f1f1 " +
                  finalValue +
                  "%, #f1f1f1 100%)";
              }}
            />
          </div>
          <div className="control">
            <div className="header">
              <span>Loan Tenure</span>
              <span>{data.year} Year</span>
            </div>
            <input
              type="range"
              step={1}
              value={data.year}
              min={1}
              max={30}
              onInput={(e) => {
                const min = e.target.min;
                const max = e.target.max;
                const value = e.target.value;
                const finalValue = ((value - min) / (max - min)) * 100;
                setData({ ...data, year: value });
                e.target.style.background =
                  "linear-gradient(to right, #f99822 0%, #f99822 " +
                  finalValue +
                  "%, #f1f1f1 " +
                  finalValue +
                  "%, #f1f1f1 100%)";
              }}
            />
          </div>
          <div className="output">
            <div>
              <span>Monthly EMI:</span>
              <span>₹{emi}</span>
            </div>
            <div>
              <span>Principal Amount:</span>
              <span>₹{data.loan}</span>
            </div>
            <div>
              <span>Interest Amount:</span>
              <span>₹{intrestAmount}</span>
            </div>
            <div className="line"></div>
            <div>
              <span>Total Amount</span>
              <span>₹{parseInt(data.loan) + parseInt(intrestAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emicalculator;
