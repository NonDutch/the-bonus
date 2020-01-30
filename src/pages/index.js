import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { request } from "../handlers/authentication";
import { save, retrieve } from "../utils/persist";

function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const expiresIn = retrieve("expiresIn");

    if (expiresIn && +new Date() < +new Date(+expiresIn)) {
      router.push("/dashboard");
    } else {
      setEmail(retrieve("email"));
    }
  }, []);

  const setAndSave = value => {
    save("email", value);
    setEmail(value);
    setError("");
  };

  const login = email => {
    if (!email.includes("frontmen.nl")) {
      return setError("You need to use a <strong>@frontmen.nl</strong> email.");
    }

    setSending(true);
    request({ url: "/api/login", data: { email } });
    router.push("/verify");
  };

  return (
    <Layout>
      <section className="form">
        <input
          type="text"
          placeholder="Your @frontmen.nl email"
          className="form__input"
          value={email}
          onChange={e => setAndSave(e.target.value)}
        />
        <button
          disabled={!email || email.length < 15 || !!error || sending}
          className="form__button"
          onClick={() => login(email)}
        >
          Get code
        </button>

        {error && (
          <span
            className="form__error"
            dangerouslySetInnerHTML={{ __html: error }}
          />
        )}
      </section>
    </Layout>
  );
}

export default Home;
