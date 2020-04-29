import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post("repositories", {
      title: `React ${Date.now()}`,
      url: "https://github.com/ElenAlmeida/gostack-template-conceitos-nodejs",
      techs: "Node, Axios, javaScript, React",
    });

    const repositorie = response.data;
    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    // TODO
   await api.delete(`repositories/${id}`);

    const repositorieIndex = repositories.findIndex((e) => e.id === id);

    repositories.splice(repositorieIndex, 1);

    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories &&
          repositories.map((repositorie) => (
            <li key={repositorie.id}>
              {repositorie.title}
              <button onClick={() => handleRemoveRepository(repositorie.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
