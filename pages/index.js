import { useState } from "react";
import Head from "next/head";

const DEFAULT_INPUT = "";
const DEFAULT_OUTPUT = "";
const DEFAULT_IS_LOADING = false;

const Home = () => {
  const [input, setInput] = useState(DEFAULT_INPUT);
  const [output, setOutput] = useState(DEFAULT_OUTPUT);
  const [isLoading, setIsLoading] = useState(DEFAULT_IS_LOADING);

  const generate = async () => {
    setIsLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });
    const data = await res.json();
    const { output } = data;
    setOutput(`${output.text}`);
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>freestyler</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>freestyler</h1>
          </div>
          <div className="header-subtitle">
            <h2>generate a freestyle rap from your favorite rapper</h2>
          </div>
        </div>
        <div className="prompt-container">
          <p style={{ color: "white" }}>rapper:</p>
          <textarea
            value={input}
            placeholder="Gordon Ramsay"
            className="prompt-box"
            onChange={handleInputChange}
          />
          <div className="prompt-buttons">
            <a
              className={
                isLoading ? "generate-button loading" : "generate-button"
              }
              onClick={generate}
            >
              <div className="generate">
                {isLoading ? <span className="loader"></span> : <p>generate</p>}
              </div>
            </a>
          </div>
          {output && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{output}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
